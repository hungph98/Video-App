const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Register
router.post("/resgiter", authController.register);

// Login
router.post("/login", authController.login);

// Google Auth
router.post("/google")


module.exports = router;