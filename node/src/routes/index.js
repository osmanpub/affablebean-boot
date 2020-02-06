const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const categoryController = require("../controllers/categoryController");

router.post("/addToCart/:id", cartController.addToCart);

router.post("/updateToCart/:id/qty/:qty", cartController.updateCart);

router.get("/categories", categoryController.categoriesList);

router.get("/category/:id", categoryController.categoryProducts);

module.exports = router;
