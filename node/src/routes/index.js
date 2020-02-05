const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/categories", categoryController.categoriesList);

router.get("/category/:id", categoryController.categoryProducts);

module.exports = router;
