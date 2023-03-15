const express = require("express");
const { cartController } = require("../controllers");
// const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/post", cartController.postCart);

module.exports = router;