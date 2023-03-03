const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const cookieParser = require("cookie-parser");

const authToken = require("../middleware/auth");

router.use(cookieParser());

router.post("/", userController.loginUser);

router.get("/auth", authToken, (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    address: req.user.address,
    role: req.user.role,
    user_id: req.user.user_id,
  });
});
router.get("/logout", authToken, userController.logoutUser);

module.exports = router;
