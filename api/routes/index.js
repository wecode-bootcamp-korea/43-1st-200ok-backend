const express = require("express");

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");

const router = express.Router();

router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);

module.exports = router;
