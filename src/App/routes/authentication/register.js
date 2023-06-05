const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

const errorHandler = require("../../middleware/errorHandler");

router.use(errorHandler);

//
router.post("/", userController.createUser);

module.exports = router;
