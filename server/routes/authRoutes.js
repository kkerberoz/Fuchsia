const express = require("express");
const router = express.Router();

//Controllers
const AuthController = require("../controller/authController");

//Routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
