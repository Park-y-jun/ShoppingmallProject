// auth 미들웨어 구현중
require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.cookies.auth;
  try {
    jwt.verify(token, process.env.JWT_SIGN);
  } catch (error) {}
};

module.exports = auth;
