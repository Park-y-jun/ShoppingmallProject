const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("Hello World!");
});
//
router.post("/", userController.createUser);

module.exports = router;
