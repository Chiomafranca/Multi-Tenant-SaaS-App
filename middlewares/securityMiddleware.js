const { check, validationResult } = require('express-validator');

// Middleware to check if the tenant exists
const checkTenantExists = async (req, res, next) => {
  try {
    const { tenantId } = req.params;
    const securitySettings = await Security.findOne({ tenantId });

    if (!securitySettings) {
      return res.status(404).json({ message: 'Tenant security settings not found' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const validatePasswordPolicy = [
  check('minLength').isInt({ min: 8 }).withMessage('Minimum password length must be at least 8 characters'),
  check('requireNumbers').isBoolean().withMessage('Require numbers should be a boolean'),
  check('requireSpecialCharacters').isBoolean().withMessage('Require special characters should be a boolean'),
];


const validateTwoFactor = [
  check('twoFactorEnabled').isBoolean().withMessage('Two-Factor Authentication must be a boolean value'),
];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  checkTenantExists,
  validatePasswordPolicy,
  validateTwoFactor,
  validate,
};
