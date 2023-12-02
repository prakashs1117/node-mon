const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const { default: mongoose } = require("mongoose");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products",
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.status(201).json({
    message: "Handling POST req /products",
    product: product,
  });
});

router.post("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
  .exec()
  .then(doc => {
    if(doc){
        res.status(200).json(doc);
    } else{
        res.status(404).json({
            message: "No valid entry found from provider"
        })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
        error: err
    })
  })
  if (id === "special") {
    res.status(201).json({
      message: `Found spcial ID ::: ${id}`,
      id: id,
    });
  } else {
    res.status(201).json({
      message: `Your passed ID ::: ${id}`,
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  res.status(201).json({
    message: "Update product ",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Delete product ",
  });
});

module.exports = router;
