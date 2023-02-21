// jwt 토큰을 디코드 하여서 거기에 맞는 유저정보 불러옴

require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../DB/models/user/User");

const authToken = async (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    res.status(400).json({
      success: false,
      msg: "토큰이 없습니다.",
    });
  }
  try {
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: verifyUser.email });
    req.user = user;

    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "토큰이 유효하지 않습니다.",
    });
  }
};

module.exports = authToken;
