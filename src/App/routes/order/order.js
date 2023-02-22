const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const errorHandler = require("../../middleware/errorHandler");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(errorHandler);
// /oreder

router.post("/");

module.exports = router;
