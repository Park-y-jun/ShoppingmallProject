const express = require("express");
const loginController = require("../../controllers/loginController");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authToken = require("../../middleware/auth");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

const errorHandler = require("../../middleware/errorHandler");
router.use(errorHandler);

router.post("/", loginController.loginUser);

module.exports = router;
