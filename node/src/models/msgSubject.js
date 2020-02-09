const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MsgSubjectSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 64 }
});

MsgSubjectSchema.virtual("url").get(function() {
  return "/msgSubject/" + this._id;
});

module.exports = mongoose.model("MsgSubject", MsgSubjectSchema);
