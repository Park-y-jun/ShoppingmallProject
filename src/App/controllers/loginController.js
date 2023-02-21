require("dotenv").config();

const User = require("../../DB/models/user/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");

const loginUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      //jwt 토큰 생성
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      //jwt 토큰을 쿠키에 저장
      res.cookie("auth", token, {
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        msg: "He is our user",
      });
    } else {
      throw new AppError("비밀번호가 일치하지 않습니다.", 401);
    }
  }
});

//유저 로그아웃

const logoutUser = tryCatch(async (req, res) => {
  console.log(req.user);
  res.clearCookie("auth");
  await req.user.save();
  res.status(200).json({ success: true, msg: "logout success" });
  // if (logout) {
  //   res.status(200).json({ success: true, msg: "logout success" });
  // } else {
  //   throw new AppError("로그 아웃 실패", 401);
  // }
});

module.exports = {
  loginUser,
  logoutUser,
};
