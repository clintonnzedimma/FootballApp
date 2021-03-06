const express = require("express");
var bodyParser = require("body-parser");
const jwt = require("express-jwt");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const csrfProtection = csrf({
  cookie: true,
});
const validation = require("./middlewares/validations");

// Initialize Express app
const app = express();

// Global Variables
global.axios = require("axios");
global.moment = require("moment");

// ******* SET UP  MIDDLEWARE ********* //

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Parse Cookie from React App
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());

// Will handle text/plain requests
app.use(bodyParser.text());

// Setup CORS

var whitelist = [
  "http://localhost:6700",
  "https://football-app-react-frontend.herokuapp.com",
  "http://10dpredict.com",
  "https://10dpredict.com",
];

var corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(require("cors")(corsOptions));

// Setup the API
require("./api")(app, validation, csrfProtection);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Export app module
module.exports = app;
