const express = require("express");
const { productController } = require("../controllers");

const router = express.Router();

router.get("/status", productController.getProductsStatusGender);
router.get("/category", productController.getProductsGenderCategory);

// router.get("/mans", mainpageController.getMans);
// router.get("/womans", mainpageController.getWomans);

module.exports = router;
