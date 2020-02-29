const debug = require("debug")("customer");
const MsgSubject = require("../models/msgSubject");

exports.subjectsList = (req, res) =>
  MsgSubject.find()
    .sort("name")
    .exec((err, subjects) => {
      if (err) {
        debug("subjectsList:" + err);
        return;
      }

      res.json({ subjects });
    });
