const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/categories", categoryController.categoriesList);

module.exports = router;
