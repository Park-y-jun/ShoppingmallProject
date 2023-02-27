require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../DB/models/user/User");

const authToken = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      throw new Error("토큰이 없습니다.");
    }

    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: verifyUser.email });
    req.user = user;

    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = authToken;
