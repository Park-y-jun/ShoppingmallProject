const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

const errorHandler = require("../../middleware/errorHandler");

router.use(errorHandler);
// /userProfile
router.get("/", userController.allUser);
// /userProfile/:user_id

router.get("/:user_id", userController.getUser);
//router.post("/", userController.createUser);

router.post("/:user_id/update", userController.updateUser);

router.delete("/:user_id/delete", userController.deleteUser);

module.exports = router;
