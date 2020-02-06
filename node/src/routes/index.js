const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const categoryController = require("../controllers/categoryController");

router.get("/addToCart/:id", cartController.addToCart);

router.get("/updateToCart/:id/quantity/:qty", cartController.updateCart);

router.get("/categories", categoryController.categoriesList);

router.get("/category/:id", categoryController.categoryProducts);

module.exports = router;
