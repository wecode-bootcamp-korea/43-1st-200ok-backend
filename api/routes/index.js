const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const invalidEmailRouter = require("./invalidEmailRouter");

router.use("/invalidEmail", invalidEmailRouter);
router.use("/users", userRouter);

module.exports = router;
