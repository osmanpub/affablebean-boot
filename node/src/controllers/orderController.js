const { body, sanitizeBody, validationResult } = require("express-validator");
const Cart = require("../session/shoppingCart");
const Customer = require("../models/customer");

const ShoppingCart = Cart.ShoppingCart;

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
  body("creditcard")
    .isLength({ min: 16, max: 19 })
    .trim()
    .withMessage("Cc number must be specified.")
    .isNumeric()
    .withMessage("CC number has non-numeric characters."),

  sanitizeBody("name").escape(),
  sanitizeBody("email").escape(),
  sanitizeBody("phone").escape(),
  sanitizeBody("address").escape(),
  sanitizeBody("creditcard").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty() || !req.session.cart) {
      res.json({
        success: false
      });
      return;
    }

    const { name, email, phone, address, creditcard } = req.body;

    const customer = new Customer({
      name,
      email,
      phone,
      address,
      creditcard
    });

    customer.save(err => {
      if (err) {
        return next(err);
      }

      const cart = new ShoppingCart();

      cart.load(req.session.cart);
      cart.update(product, req.params.qty);

      req.session.cart = cart;
      res.json({
        items: cart.items,
        numberOfItems: Number(cart.numberOfItems),
        subtotal: cart.subtotal
      });

      // 	int orderId = orderManager.placeOrder(cart, deliverySurcharge, checkoutForm);

      // 	if (orderId == 0) {
      // 		return null;
      // 	}

      // 	return orderManager.getOrderDetails(orderId);

      res.json({
        success: true
      });
    });
  }
];
