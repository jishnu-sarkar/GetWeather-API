const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validationController = require("../controllers/validationController");

router.post(
  "/registration",
  validationController.validateRegistration,
  userController.createUser
);

router.post(
  "/login",
  validationController.validateLogin,
  userController.userLogin
);

router.get(
  "/history",
  validationController.validateUser,
  userController.userSearchHistory
);

// router.delete("/", userController.delUsers);

module.exports = router;
