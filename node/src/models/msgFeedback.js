const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MsgFeedbackSchema = new Schema({
  name: { type: String, required: true, max: 64 },
  email: { type: String, required: true, max: 64 },
  msg: { type: String, required: true, max: 256 },
  msgSubject: { type: Schema.Types.ObjectId, ref: "MsgSubject" }
});

MsgFeedbackSchema.virtual("url").get(function() {
  return "/msgFeedback/" + this._id;
});

module.exports = mongoose.model("MsgFeedback", MsgFeedbackSchema);
