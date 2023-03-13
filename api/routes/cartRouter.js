const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.get("/status", cartController.postCart);

// router.get("/mans", mainpageController.getMans);
// router.get("/womans", mainpageController.getWomans);

module.exports = router;
