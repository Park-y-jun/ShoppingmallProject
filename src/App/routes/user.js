const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../DB/models/user/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "이메일을 확인해주세요." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "비밀번호가 다릅니다." });
  }

  const accessToken = "your_access_token"; // 토큰 생성

  res.status(200).json({ message: "로그인 성공!", accessToken });
});

module.exports = router;
