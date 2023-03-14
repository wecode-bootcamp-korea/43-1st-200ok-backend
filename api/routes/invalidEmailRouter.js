const express = require("express");
const { invalidEmailController } = require("../controllers");

const router = express.Router();

router.post("", invalidEmailController.check);

module.exports = router;
