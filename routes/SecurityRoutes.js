const express = require('express');
const router = express.Router();
const { 
  createSecuritySettings,
  updateTwoFactor, 
  getSecuritySettings, 
  updatePasswordPolicy, 
  getAllSecurities, 
  deleteSecuritySettings 
} = require('../controllers/SecurityController');
const { checkTenantExists, validatePasswordPolicy, validateTwoFactor, validate } = require('../middlewares/securityMiddleware');

// Create security settings
router.post('/:tenantId', checkTenantExists, createSecuritySettings);

// Update Two-Factor Authentication
router.put('/:tenantId/two-factor', checkTenantExists, validateTwoFactor, validate, updateTwoFactor);

// Get security settings
router.get('/:tenantId', getSecuritySettings);

// Update password policy
router.patch('/:tenantId/password-policy', validatePasswordPolicy, validate, updatePasswordPolicy);

// Get access logs
router.get('/', getAllSecurities);

// Delete security settings
router.delete('/:tenantId', deleteSecuritySettings);

module.exports = router;
