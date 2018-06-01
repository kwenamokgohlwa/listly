require("dotenv").config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./config/passport-config");
const routeConfig = require("./config/route-config.js");

const app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());
app.use(session({
  secret: process.env.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1.21e+9}
}));
app.use(flash());
passportConfig.init(app);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

routeConfig.init(app);

module.exports = app;
