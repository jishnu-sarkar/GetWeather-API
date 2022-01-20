const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.userLogin);

router.post("/registration", userController.createUser);

module.exports = router;
