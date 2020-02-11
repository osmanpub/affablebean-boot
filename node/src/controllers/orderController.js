const { body, validationResult } = require("express-validator");
const Cart = require("../session/shoppingCart");
const Customer = require("../models/customer");
const CustomerOrder = require("../models/customerOrder");
const OrderedProduct = require("../models/orderedProduct");
const Product = require("../models/product");

const ShoppingCart = Cart.ShoppingCart;
const surcharge = 3;

exports.purchaseOrder = [
  body("name")
    .escape()
    .trim()
    .isLength({ min: 3, max: 64 })
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("email")
    .escape()
    .trim()
    .isLength({ min: 8, max: 64 })
    .withMessage("Email must be specified.")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("phone")
    .escape()
    .trim()
    .isLength({ min: 8, max: 64 })
    .withMessage("Phone must be specified."),
  body("address")
    .escape()
    .trim()
    .isLength({ min: 8, max: 64 })
    .withMessage("Address must be specified."),
  body("creditCard")
    .escape()
    .trim()
    .isLength({ min: 16, max: 19 })
    .withMessage("Cc number must be specified.")
    .isNumeric()
    .withMessage("CC number has non-numeric characters."),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors)

    if (!errors.isEmpty()) {
      res.json({
        errors,
        success: false
      });
      return;
    }

    if (!req.session.cart) {
      return next(err);
    }

    const { name, email, phone, address, creditCard } = req.body;

    const customer = new Customer({
      name,
      email,
      phone,
      address,
      creditCard
    });

    customer.save(err => {
      if (err) {
        return next(err);
      }

      const cart = new ShoppingCart();
      cart.load(req.session.cart);

      const customerOrder = new CustomerOrder({
        amount: (cart.subtotal + surcharge).toFixed(2),
        customer
      });

      customerOrder.save(err => {
        if (err) {
          return next(err);
        }

        const orderedProducts = [];
        const products = [];

        cart.items.forEach(item => {
          Product.findById(item.product._id).exec((err, product) => {
            if (err) {
              return;
            }

            products.push(product);

            const orderedProduct = new OrderedProduct({
              quantity: item.quantity,
              customerOrder,
              product
            });

            orderedProduct.save(err => {
              if (err) {
                return next(err);
              }

              orderedProducts.push(orderedProduct);
            });
          });
        });

        cart.clear();
        req.session.cart = null;

        const orderMap = new Map();

        orderMap.set("orderRecord", customerOrder);
        orderMap.set("customer", customer);
        orderMap.set("orderedProducts", orderedProducts);
        orderMap.set("products", products);

        res.json({
          orderMap
        });
      });
    });
  }
];
