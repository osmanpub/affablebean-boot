const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MsgFeedbackSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 64 },
  email: { type: String, required: true, min: 8, max: 32 },
  msg: { type: String, required: true, min: 8, max: 1024 },
  subject: { type: Schema.Types.ObjectId, ref: "MsgSubject" },
});

MsgFeedbackSchema.virtual("url").get(function () {
  return "/msgFeedback/" + this._id;
});

module.exports = mongoose.model("MsgFeedback", MsgFeedbackSchema);
