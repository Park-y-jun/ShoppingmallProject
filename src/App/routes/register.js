const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../DB/models/user");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send(User.name); // 질문: 왜 reference.error가 날까요
});
//
router.post("/", userController.createUser);

module.exports = router;
