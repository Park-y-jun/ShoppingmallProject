const express = require("express");
const loginController = require("../../controllers/loginController");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const errorHandler = require("../../middleware/errorHandler");
router.use(errorHandler);

router.post("/", loginController.loginUser);

module.exports = router;
