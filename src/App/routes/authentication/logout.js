const express = require("express");
const loginController = require("../../controllers/loginController");
const router = express.Router();
const cookieParser = require("cookie-parser");

const authToken = require("../../middleware/auth");

const errorHandler = require("../../middleware/errorHandler");

router.use(cookieParser());
router.use(errorHandler);

router.get("/", authToken, loginController.logoutUser);

module.exports = router;
