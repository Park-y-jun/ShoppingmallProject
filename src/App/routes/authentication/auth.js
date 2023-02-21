const express = require("express");

const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authToken = require("../../middleware/auth");
const errorHandler = require("../../middleware/errorHandler");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.use(errorHandler);

router.get("/", authToken, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    user_id: req.user.user_id,
    isAdmin: req.user.role === "admin" ? true : false,
    name: req.user.name,
    address: req.user.address,
    phone: req.user.phone,
    role: req.user.role,
  });
});

module.exports = router;
