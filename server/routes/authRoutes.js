const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
//Controllers
const AuthController = require("../controller/authController");

//Routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/checklogin", AuthController.checkLogin);
router.get("/getuser", auth, AuthController.getUser);
module.exports = router;
