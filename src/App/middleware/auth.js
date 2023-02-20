// auth 미들웨어 구현중
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    res.status(400).json({
      success: false,
      msg: "토큰이 없습니다.",
    });
  }
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SIGN);
    req.user = decodedUser;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "토큰이 유효하지 않습니다.",
    });
  }
};

module.exports = authToken;
