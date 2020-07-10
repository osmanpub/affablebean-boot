const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const indexRouter = require("./src/routes/index");

//Set up mongoose connection
const dev_db_url =
  "mongodb+srv://random_user:iamarandomuser@cluster0-kv8co.mongodb.net/affablebean?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(compression()); //Compress all routes
app.use(helmet());

app.use(cors());

// app.use(
//   cors({
//     credentials: true,
//     maxAge: 3600000,
//     origin: "http://localhost:4000",
//   })
// );

const sess = {
  cookie: { secure: false, httpOnly: false, maxAge: 3600000 },
  resave: false,
  saveUninitialized: false,
  secret: "keyboard cat",
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
