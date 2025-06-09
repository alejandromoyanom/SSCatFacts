const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register-login", userController.registerOrLogin);

module.exports = router;
