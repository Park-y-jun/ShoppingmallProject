require("dotenv").config();

const User = require("../../DB/models/user/User");
const bcrypt = require("bcrypt");
const tryCatch = require("../utils/tryCatch");
//const AppError = require("../utils/AppError");

const createUser = tryCatch(async (req, res, next) => {
  // saltrounds를 10으로 설정한 해쉬 처리된 비밀번호 설정
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    address: req.body.address,
    phone: req.body.phone,
    role: req.body.role,
    user_id: req.body.user_id,
  });
  await user.save();
  res.status(200).json({ success: true, msg: "createuser successfully" });
});

const getUser = tryCatch(async (req, res, next) => {
  const userProfile = await User.findOne({ user_id: req.params.user_id });
  if (userProfile) {
    res.status(200).json({
      success: true,
      msg: "userProfile success",
      userProfile,
    });
  } else {
    res.status(404).json({ success: false, msg: "userProfile not found" });
  }
});

const updateUser = tryCatch(async (req, res, next) => {
  const updateUser = await User.findOneAndUpdate(
    { user_id: req.params.user_id },
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
      },
    }
  );
  if (updateUser) {
    res.status(200).json({ success: true, msg: "updateUser success" });
  } else {
    res.status(404).json({ success: false, msg: "updateUser not found" });
  }
});

const deleteUser = tryCatch(async (req, res, next) => {
  const deleteUser = await User.findOneAndDelete({
    user_id: req.params.user_id,
  });
  if (deleteUser) {
    res.status(200).json({ success: true, msg: "deleteUser success" });
  } else {
    res.status(404).json({ success: false, msg: "deleteUser not found" });
  }
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
