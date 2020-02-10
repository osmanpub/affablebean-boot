const { body, sanitizeBody, validationResult } = require("express-validator");
const MsgFeedback = require("../models/msgFeedback");
const MsgSubject = require("../models/msgSubject");

exports.contact = [
  body("name")
    .isLength({ min: 3, max: 64 })
    .trim()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("email")
    .isLength({ min: 8, max: 32 })
    .trim()
    .withMessage("Email must be specified.")
    .isAlphanumeric()
    .withMessage("Email must be a valid email address."),
  body("msg")
    .isLength({ min: 8, max: 1024 })
    .trim()
    .isAlphanumeric()
    .withMessage("Message must be specified."),
  body("subjectId")
    .isLength({ min: 1 })
    .withMessage("Subject must be specified.")
    .isAlphanumeric()
    .withMessage("Select a subject."),

  sanitizeBody("name").escape(),
  sanitizeBody("email").escape(),
  sanitizeBody("msg").escape(),
  sanitizeBody("subjectId").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
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
