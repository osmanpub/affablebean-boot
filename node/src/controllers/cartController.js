const debug = require("debug")("cart");
const Product = require("../models/product");
const Cart = require("../session/shoppingCart");

const ShoppingCart = Cart.ShoppingCart;

exports.addToCart = (req, res) =>
  Product.findById(req.params.id).exec((err, product) => {
    if (err) {
      debug("addToCart error:" + err);
      return;
    }

    const cart = new ShoppingCart();

    if (req.session.cart) {
      cart.load(req.session.cart);
    }

    cart.addItem(product);

    req.session.cart = cart;
    res.json({
      items: cart.items,
      numberOfItems: Number(cart.numberOfItems),
      subtotal: cart.subtotal
    });
  });

exports.clearCart = (req, res) => {
  if (!req.session.cart) {
    res.json({
      success: false
    });
    return;
  }

  const cart = new ShoppingCart();

  cart.load(req.session.cart);
  cart.clear();

  req.session.cart = cart;
  res.json({
    success: true
  });
};

exports.updateCart = (req, res) =>
  Product.findById(req.params.id).exec((err, product) => {
    if (err) {
      debug("updateCart error:" + err);
      return;
    }

    if (!req.session.cart) {
      return;
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
  });
