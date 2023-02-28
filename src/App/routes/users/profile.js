const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();
const authToken = require("../../middleware/auth");

const bodyParser = require("body-parser");
const errorHandler = require("../../middleware/errorHandler");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(errorHandler);
// /userProfile
router.get("/", userController.allUser);
// /userProfile/:user_id

router.get("/:user_id", userController.getUser);
//router.post("/", userController.createUser);

router.post("/:user_id/update", userController.updateUser);

router.delete("/:user_id/delete", userController.deleteUser);

module.exports = router;
