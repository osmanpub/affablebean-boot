const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderedProductSchema = new Schema({
  quantity: { type: Number, required: true },
  customerOrder: { type: Schema.Types.ObjectId, ref: "customerOrder" },
  product: { type: Schema.Types.ObjectId, ref: "Product" }
});

OrderedProductSchema.virtual("url").get(function() {
  return "/orderedProduct/" + this._id;
});

module.exports = mongoose.model("OrderedProduct", OrderedProductSchema);
