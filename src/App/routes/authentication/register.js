const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

const bodyParser = require("body-parser");
const errorHandler = require("../../middleware/errorHandler");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(errorHandler);

//
router.post("/", userController.createUser);

module.exports = router;
