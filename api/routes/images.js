const express = require("express");
const router = express.Router();
const ImagesController = require("../controllers/images");

router.post("/", ImagesController.Upload);

module.exports = router;
