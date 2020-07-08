const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 64 },
  email: { type: String, required: true, min: 8, max: 32 },
  phone: { type: String, required: true, min: 8, max: 32 },
  address: { type: String, required: true, min: 8, max: 256 },
  city_region: { type: String, optional: true, min: 2, max: 2, default: "NY" },
  creditCard: { type: String, required: true, min: 16, max: 19 },
});

CustomerSchema.virtual("url").get(function () {
  return "/customer/" + this._id;
});

module.exports = mongoose.model("Customer", CustomerSchema);
