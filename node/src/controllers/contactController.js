const { body, validationResult } = require("express-validator");
const debug = require("debug")("categories");
const MsgFeedback = require("../models/msgFeedback");
const MsgSubject = require("../models/msgSubject");

exports.contact = [
  body("name")
    .escape()
    .trim()
    .isLength({ min: 3, max: 64 })
    .withMessage("Name must be specified.")
    .matches(/^[\w\s]+$/i)
    .withMessage("Name has non-alphanumeric characters."),
  body("email")
    .escape()
    .trim()
    .isLength({ min: 8, max: 32 })
    .normalizeEmail()
    .isEmail()
    .withMessage("Email must be specified."),
  body("msg")
    .escape()
    .trim()
    .isLength({ min: 8, max: 1024 })
    .isAlphanumeric()
    .withMessage("Message must be specified."),
  body("subjectId")
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Subject must be specified.")
    .isAlphanumeric()
    .withMessage("Select a subject."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.errors,
        success: false
      });
      return;
    }

    const { name, email, msg, subjectId } = req.body;

    MsgSubject.findById(subjectId).exec((err, subject) => {
      if (err) {
        debug("contact MsgSubject find error:" + err);
        return next(err);
      }

      const msgFeedback = new MsgFeedback({
        name,
        email,
        msg,
        subject: subjectId
      });

      msgFeedback.save(err => {
        if (err) {
          debug("contact MsgSubject save error:" + err);
          return next(err);
        }

        res.json({
          success: true
        });
      });
    });
  }
];
