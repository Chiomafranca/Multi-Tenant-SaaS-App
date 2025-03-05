const { body, validationResult } = require('express-validator');

// Validation rules for registering a user
const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['admin', 'user']).withMessage('Role must be either "admin" or "user"'),
];

// Validation rules for logging in
const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { registerValidation, loginValidation, validate };
