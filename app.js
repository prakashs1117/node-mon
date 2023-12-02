const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

mongoose.connect(
  "mongodb+srv://ocbecommerce:" +
    process.env.MONGO_ATLAST_PW +
    "@cluster234.5kwlj3c.mongodb.net/?retryWrites=true&w=majority",
);

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//Routes which should handle Requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

/* app.use((req, res, next) => {
    res.status(200).json({
        message: "It works"
    });
}) */

module.exports = app;
