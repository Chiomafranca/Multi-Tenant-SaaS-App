const express = require('express');
const router = express.Router();
const { checkAdminPermission } = require('../middleware/securityMiddleware');
const { createSecuritySettings, updateTwoFactor, getSecuritySettings, updatePasswordPolicy, getAccessLogs, deleteSecuritySettings } = require('../controllers/SecurityController');


router.post('/:tenantId', checkAdminPermission, createSecuritySettings);


router.put('/:tenantId/two-factor', checkAdminPermission, updateTwoFactor);


router.get('/:tenantId', checkAdminPermission, getSecuritySettings);


router.put('/:tenantId/password-policy', checkAdminPermission, updatePasswordPolicy);


router.get('/:tenantId/access-logs', checkAdminPermission, getAccessLogs);


router.delete('/:tenantId', checkAdminPermission, deleteSecuritySettings);

module.exports = router;
