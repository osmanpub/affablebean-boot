const async = require("async");
const Category = require("../models/category");

exports.categoriesList = (req, res) =>
  Category.find().exec((err, categories) => {
    if (err) {
      return;
    }

    res.json({ categories });
  });
