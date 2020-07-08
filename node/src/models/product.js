const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 64 },
  price: { type: Number, required: true },
  description: { type: String, required: true, min: 3, max: 256 },
  lastUpdate: { type: Date, default: Date.now() },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

ProductSchema.virtual("url").get(function () {
  return "/product/" + this._id;
});

module.exports = mongoose.model("Product", ProductSchema);
