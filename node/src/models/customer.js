const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true, max: 64 },
  email: { type: String, required: true, max: 64 },
  phone: { type: String, required: true, max: 64 },
  address: { type: String, required: true, max: 64 },
  city_region: { type: String, required: true, max: 2 },
  cc_number: { type: String, required: true, max: 19 }
});

CustomerSchema.virtual("url").get(function() {
  return "/customer/" + this._id;
});

module.exports = mongoose.model("Customer", CustomerSchema);
