const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("Login page");
});

router.post("/", userController.loginUser);

module.exports = router;
