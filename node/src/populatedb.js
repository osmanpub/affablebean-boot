#! /usr/bin/env node

const async = require("async");
const Category = require("./models/category");
const MsgSubject = require("./models/msgSubject");
const Product = require("./models/product");

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://admin:@cluster0-kv8co.mongodb.net/affablebean?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const categories = [];
const products = [];

function categoryCreate(name, cb) {
  const category = new Category({ name });

  category.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      callback => categoryCreate("dairy", callback),
      callback => categoryCreate("meats", callback),
      callback => categoryCreate("bakery", callback),
      callback => categoryCreate("fruit n veg", callback),
      callback => categoryCreate("cereals", callback),
      callback => categoryCreate("drinks", callback)
    ],
    cb
  );
}

function productCreate(name, price, description, category, cb) {
  const product = new Product({ name, price, description, category });

  product.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Product: " + product);
    products.push(product);
    cb(null, product);
  });
}

function createProducts(cb) {
  async.series(
    [
      callback =>
        productCreate(
          "milk",
          1.7,
          "semi skimmed (1L)",
          categories[0],
          callback
        ),
      callback =>
        productCreate(
          "cheese",
          2.39,
          "mild cheddar (330g)",
          categories[0],
          callback
        ),
      callback =>
        productCreate(
          "butter",
          1.09,
          "unsalted (250g)",
          categories[0],
          callback
        ),
      callback =>
        productCreate(
          "free range eggs",
          1.76,
          "medium-sized (6 eggs)",
          categories[0],
          callback
        ),

      callback =>
        productCreate(
          "organic meat patties",
          2.29,
          "rolled in fresh herbs<br>2 patties (250g)",
          categories[1],
          callback
        ),
      callback =>
        productCreate(
          "parma ham",
          3.49,
          "matured, organic (70g)",
          categories[1],
          callback
        ),
      callback =>
        productCreate(
          "chicken leg",
          2.59,
          "free range (250g)",
          categories[1],
          callback
        ),
      callback =>
        productCreate(
          "sausages",
          3.55,
          "reduced fat, pork<br>3 sausages (350g)",
          categories[1],
          callback
        ),

      callback =>
        productCreate(
          "sunflower seed loaf",
          1.89,
          "600g",
          categories[2],
          callback
        ),
      callback =>
        productCreate(
          "sesame seed bagel",
          1.19,
          "4 bagels",
          categories[2],
          callback
        ),
      callback =>
        productCreate(
          "pumpkin seed bun",
          1.15,
          "4 buns",
          categories[2],
          callback
        ),
      callback =>
        productCreate(
          "chocolate cookies",
          2.39,
          "contain peanuts<br>(3 cookies)",
          categories[2],
          callback
        ),

      callback =>
        productCreate(
          "corn on the cob",
          1.59,
          "2 pieces",
          categories[3],
          callback
        ),
      callback =>
        productCreate("red currants", 2.49, "150g", categories[3], callback),
      callback =>
        productCreate("broccoli", 1.29, "500g", categories[3], callback),
      callback =>
        productCreate(
          "seedless watermelon",
          1.49,
          "250g",
          categories[3],
          callback
        ),

      callback =>
        productCreate(
          "jumbo oats",
          1.99,
          "Jumbo Oats (500g)",
          categories[4],
          callback
        ),
      callback =>
        productCreate(
          "porridge oats",
          2.75,
          "Organic Porridge Oats (1kg)",
          categories[4],
          callback
        ),
      callback =>
        productCreate(
          "rice flakes",
          2.99,
          "Organic Rice Flakes (500g)",
          categories[4],
          callback
        ),
      callback =>
        productCreate(
          "granola",
          3.99,
          "Apple & Cinnamon Granola (400g)",
          categories[4],
          callback
        ),

      callback =>
        productCreate(
          "herbal tea",
          2.5,
          "Herbal Tea (20 bags)",
          categories[5],
          callback
        ),
      callback =>
        productCreate(
          "wholebean coffee",
          10.75,
          "Organic Fairtrade Wholebean Coffee (500g)",
          categories[5],
          callback
        ),
      callback =>
        productCreate(
          "green tea",
          1.99,
          "Organic Green Tea (15 bags)",
          categories[5],
          callback
        ),
      callback =>
        productCreate(
          "organic coffee",
          4.75,
          "Organic Fairtrade Italian Roast Ground Coffee (227g)",
          categories[5],
          callback
        )
    ],
    cb
  );
}

function subjectCreate(name, cb) {
  const subject = new MsgSubject({ name });

  subject.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New MsgSubject: " + subject);
    cb(null, subject);
  });
}

function createSubjects(cb) {
  async.series(
    [
      callback => subjectCreate("Brands or product", callback),
      callback => subjectCreate("Investor relations", callback),
      callback => subjectCreate("Sustainability", callback),
      callback => subjectCreate("The Company", callback),
      callback => subjectCreate("Media enquiry", callback),
      callback => subjectCreate("Website feedback", callback),
      callback => subjectCreate("Other", callback)
    ],
    cb
  );
}

async.series([createCategories, createProducts, createSubjects], err => {
  mongoose.connection.close();

  if (err) {
    console.log("FINAL ERR: " + err);
  }
});
