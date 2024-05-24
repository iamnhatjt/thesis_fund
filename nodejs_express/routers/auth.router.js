const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signIn", authController.signIn);

router.post("/signup", authController.signUp);

router.post("/forgotPassword", authController.forgotPassword);

router.post("/resetPassword", authController.resetPassword);

module.exports = router;
