const mongoose = require("mongoose");
/*setting up the default mongoose connection*/
var dev_db_url =
  "mongodb+srv://noman:noman123@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true";
var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(
  "mongodb+srv://noman:noman123@cluster0.7244f.mongodb.net/local_library?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
); //get the dafault connection
//create connection also take callback function.
let db = mongoose.connection;
//bind error to error  event to show error under  connectivity issues.
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var createError = require("http-errors");
var helmet = require("helmet");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let jade = require("jade");
var compression = require(" compression");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
app.use(helmet());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
