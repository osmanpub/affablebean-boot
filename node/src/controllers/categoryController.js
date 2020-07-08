const async = require("async");
const debug = require("debug")("categories");
const Category = require("../models/category");
const Product = require("../models/product");

exports.categoriesList = (req, res) =>
  Category.find()
    .sort("name")
    .exec((err, categories) => {
      if (err) {
        debug("categoriesList error:" + err);
        return;
      }

      res.json({ categories });
    });

exports.categoryProducts = (req, res) =>
  async.parallel(
    {
      categories: (callback) => Category.find().sort("name").exec(callback),
      category: (callback) => Category.findById(req.params.id).exec(callback),
      products: (callback) =>
        Product.find(
          { category: req.params.id },
          "name price description category"
        )
          .populate("category")
          .sort("name")
          .exec(callback),
    },
    (err, categoryProducts) => {
      if (err) {
        debug("categoryProducts error:" + err);
        return;
      }

      res.json({ categoryProducts });
    }
  );
