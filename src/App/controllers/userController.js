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

const allUser = tryCatch(async (req, res, next) => {
  const allUser = await User.find({ deleted: false });
  if (allUser) {
    res.status(200).json({
      success: true,
      msg: "allUser success",
      allUser,
    });
  } else {
    res.status(404).json({ success: false, msg: "allUser not found" });
  }
});

const getUser = tryCatch(async (req, res, next) => {
  const userProfile = await User.findOne({
    user_id: req.params.user_id,
    deleted: false,
  });
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
    { user_id: req.params.user_id, deleted: false },
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
  const user = await User.findOne({
    user_id: parseInt(req.params.user_id),
    deleted: false,
  });
  if (user === null) {
    return res.status(404).json({ message: "User not found" });
  }
  user.deleted = true;
  await user.save();
  res.json({ message: "유저가 삭제 되었습니다" });
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  allUser,
};
