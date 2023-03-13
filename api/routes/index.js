const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
const cartRouter = require("./productRouter");

router.use("/products", productRouter);
router.use("/products", cartRouter);

module.exports = router;
