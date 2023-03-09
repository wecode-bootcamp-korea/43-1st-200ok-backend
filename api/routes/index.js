const express = require("express");
const router = express.Router();

const mainpageRouter = require("./mainpageRouter");

router.use("/mainpage", mainpageRouter);

module.exports = router;
