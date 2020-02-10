const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerOrderSchema = new Schema({
  amount: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now() },
  confirmationNumber: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 999999999) + 1
  },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" }
});

CustomerOrderSchema.virtual("url").get(function() {
  return "/customerOrder/" + this._id;
});

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
