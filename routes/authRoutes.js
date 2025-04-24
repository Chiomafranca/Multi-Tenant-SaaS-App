const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../middlewares/authValidationMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");

// Register route
router.post("/register", registerValidation, validate, registerUser);

// Login route
router.post("/login", loginValidation, validate, loginUser);

module.exports = router;
