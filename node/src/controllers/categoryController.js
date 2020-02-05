const async = require("async");
const Category = require("../models/category");
const Product = require("../models/product");

exports.categoriesList = (req, res) =>
  Category.find().exec((err, categories) => {
    if (err) {
      return;
    }

    res.json({ categories });
  });

exports.categoryProducts = (req, res) =>
  async.parallel(
    {
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
