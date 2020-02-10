const { body, sanitizeBody, validationResult } = require("express-validator");
const Cart = require("../session/shoppingCart");
const Customer = require("../models/customer");
const CustomerOrder = require("../models/customerOrder");
const OrderedProduct = require("../models/orderedProduct");
const Product = require("../models/product");

const ShoppingCart = Cart.ShoppingCart;
const surcharge = 3;

exports.purchaseOrder = [
  body("name")
    .isLength({ min: 3, max: 64 })
    .trim()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("email")
    .isLength({ min: 8, max: 64 })
    .trim()
    .withMessage("Email must be specified.")
    .isAlphanumeric()
    .withMessage("Email must be a valid email address."),
  body("phone")
    .isLength({ min: 8, max: 64 })
    .trim()
    .withMessage("Phone must be specified."),
  body("address")
    .isLength({ min: 8, max: 64 })
    .trim()
    .withMessage("Address must be specified."),
  body("creditCard")
    .isLength({ min: 16, max: 19 })
    .trim()
    .withMessage("Cc number must be specified.")
    .isNumeric()
    .withMessage("CC number has non-numeric characters."),

  sanitizeBody("name").escape(),
  sanitizeBody("email").escape(),
  sanitizeBody("phone").escape(),
  sanitizeBody("address").escape(),
  sanitizeBody("creditCard").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty() || !req.session.cart) {
      res.json({
        success: false
      });
      return;
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

        cart.items.forEach(item => {
          Product.findById(item.product._id).exec((err, product) => {
            if (err) {
              return;
            }

            const orderedItem = new OrderedProduct({
              quantity: item.quantity,
              customerOrder,
              product
            });

            orderedItem.save(err => {
              if (err) {
                return next(err);
              }
            });
          });
        });

        // List<Product> products = new ArrayList<>();

        // orderedProducts.forEach(op -> {
        //   Optional<Product> p = productRepository.findById(op.getOrderedProductPK().getProductId());

        //   if (p.isPresent()) {
        //     products.add(p.get());
        //   }
        // });

        // // add each item to orderMap
        // Map<String, Object> orderMap = new HashMap<>();

        // orderMap.put("orderRecord", customerOrder);
        // orderMap.put("customer", customer);
        // orderMap.put("orderedProducts", orderedProducts);
        // orderMap.put("products", products);

        cart.clear();
        req.session.cart = null;

        res.json({
          success: true
        });
      });
    });
  }
];
