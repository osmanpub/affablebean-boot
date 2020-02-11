const { body, validationResult } = require("express-validator");
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
    // console.log(errors)

    if (!errors.isEmpty()) {
      res.json({
        errors,
        success: false
      });
      return;
    }

    const { name, email, msg, subjectId } = req.body;

    MsgSubject.findById(subjectId).exec((err, subject) => {
      if (err) {
        return next(err);
      }

      const msgFeedback = new MsgFeedback({
        name,
        email,
        msg,
        subject
      });

      msgFeedback.save(err => {
        if (err) {
          return next(err);
        }

        res.json({
          success: true
        });
      });
    });
  }
];

// errors:
// errors: Array(1)
// 0:
// value: "joe bloggs"
// msg: "Name has non-alphanumeric characters."
// param: "name"
// location: "body"
