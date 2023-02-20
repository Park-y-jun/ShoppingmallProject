const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../DB/models/user");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  console.log(User);
  res.send("Hello World");
});
//
router.post("/", userController.createUser);

module.exports = router;

// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require("../../DB/models/user/user.js");

// const router = express.Router();

// router.post("/register", async (req, res) => {
//   const { name, email, password, phone, address } = req.body;
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     return res.status(400).json({ message: "email을 확인해주세요." });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     name,
//     email,
//     password: hashedPassword,
//     phone,
//     address,
//   });

//   try {
//     await newUser.save();
//     res.status(200).json({ message: "회원가입에 성공했습니다." });
//   } catch (error) {
//     res.status(400).json({ message: "회원가입에 실패했습니다." });
//   }
// });

// module.exports = router;
