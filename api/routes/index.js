const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");

router.use("/products", productRouter);
router.use("/carts", cartRouter);

module.exports = router;
