const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders were fetches",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: "Orders were added",
    order: order,
  });
});

router.post("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  if (id === "special") {
    res.status(201).json({
      message: `Found spcial ID ::: ${id}`,
      id: id,
    });
  } else {
    res.status(201).json({
      message: `Your passed ID ::: ${id}`,
      id: id,
    });
  }
});

router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(201).json({
    message: "Updated orderId",
    id: id,
  });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(201).json({
    message: "Delete product ",
    id: id,
  });
});

module.exports = router;
