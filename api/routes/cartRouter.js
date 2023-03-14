const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.get("", cartController.postCart);

module.exports = router;
