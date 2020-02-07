const async = require("async");
const Product = require("../models/product");
const Cart = require("../session/shoppingCart");

const ShoppingCart = Cart.ShoppingCart;

exports.addToCart = (req, res) =>
  Product.findById(req.params.id).exec((err, product) => {
    if (err) {
      return;
    }

    const cart = new ShoppingCart();

    if (req.session.cart) {
      cart.load(req.session.cart);
    }

    console.log(cart);
    cart.addItem(product);

    req.session.cart = cart;
    res.json({ cart });
  });

exports.updateCart = (req, res) =>
  Product.findById(req.params.id).exec((err, product) => {
    if (err) {
      return;
    }

    const cart = req.session.cart;

    if (!cart) {
      return;
    }

    cart.update(product, req.params.qty);
    req.session.cart = cart;
    res.json({ cart });
  });
