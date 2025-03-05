const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../middlewares/authValidationMiddleware');

// Register route
router.post("/register", registerValidation, validate, authController.registerUser);

// Login route
router.post("/login", loginValidation, validate, authController.loginUser);

module.exports = router;

