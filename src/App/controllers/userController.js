require("dotenv").config();

const User = require("../../DB/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 유저 회원가입
const createUser = async (req, res) => {
  // saltrounds를 10으로 설정한 해쉬 처리된 비밀번호 설정
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new User({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      address: req.body.address,
      phone: req.body.phone,
      token: req.body.token,
    });
    await user.save();
    res.status(200).json({ success: true, msg: "createuser successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, msg: error.message });
  }
};

// 유저 로그인
const loginUser = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({ id: id });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        //jwt 토큰 생성
        const token = jwt.sign({ id: user.id }, process.env.JWT_SIGN);

        const userResult = {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          address: user.address,
          phone: user.phone,
          token: token,
        };
        res.cookie("auth", userResult.token).status(200).json({
          success: true,
          msg: "He is our user",
          data: userResult,
        });
      } else {
        res.status(401).json({ success: false, msg: "He is not our user" });
      }
    }
  } catch (error) {
    res.status(404).json({ success: false, msg: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
