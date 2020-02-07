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

    cart.addItem(product);
    req.session.cart = cart;
    res.json({
      cart,
      numberOfItems: cart.numberOfItems,
      subtotal: cart.subtotal
    });
  });

exports.updateCart = (req, res) =>
  Product.findById(req.params.id).exec((err, product) => {
    if (err || !req.session.cart) {
      return;
    }

    const cart = new ShoppingCart();
    cart.load(req.session.cart);

    cart.update(product, req.params.qty);
    req.session.cart = cart;
    res.json({
      cart,
      numberOfItems: cart.numberOfItems,
      subtotal: cart.subtotal
    });
  });
