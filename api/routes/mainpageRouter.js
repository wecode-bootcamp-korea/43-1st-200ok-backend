const express = require("express");
const { mainpageController } = require("../controllers");

const router = express.Router();

router.get("/bests/man", mainpageController.getBestMans);
router.get("/bests/woman", mainpageController.getBestWomans);
router.get("/news", mainpageController.getNews);
router.get("/mans", mainpageController.getMans);
router.get("/womans", mainpageController.getWomans);

module.exports = router;
