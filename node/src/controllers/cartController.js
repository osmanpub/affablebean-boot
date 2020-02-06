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
    cart.addItem(product);

    req.session.cart = cart;
    res.json({ cart });
  });

exports.updateCart = (req, res) =>
  async.parallel(
    {
      categories: callback => Category.find().exec(callback),
      category: callback => Category.findById(req.params.id).exec(callback),
      products: callback =>
        Product.find(
          { category: req.params.id },
          "name price description category"
        )
          .populate("category")
          .exec(callback)
    },
    (err, categoryProducts) => {
      if (err) {
        return;
      }

      res.json({ categoryProducts });
    }
  );
