const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authToken = require("../middleware/auth");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("Login page");
});

router.post("/", userController.loginUser);
router.get("/auth", authToken, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true,
    name: req.user.name,
    email: req.user.email,
    address: req.user.address,
    phone: req.user.phone,
    role: req.user.role,
  });
});
router.get("/logout", authToken, userController.logoutUser);

module.exports = router;
