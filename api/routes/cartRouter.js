const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/post", cartController.postCart);
router.get("/get", cartController.getCart);
router.delete("/delete", cartController.deleteCart);

module.exports = router;
