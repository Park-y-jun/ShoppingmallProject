const express = require("express");
const loginController = require("../../controllers/loginController");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authToken = require("../../middleware/auth");

const errorHandler = require("../../middleware/errorHandler");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(errorHandler);

router.get("/", authToken, loginController.logoutUser);

module.exports = router;
