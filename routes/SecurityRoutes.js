const express = require('express');
const router = express.Router();
const SecurityController = require('../controllers/SecurityController');
const { checkAdminPermission } = require('../middleware/securityMiddleware');


router.post('/:tenantId', checkAdminPermission, SecurityController.createSecuritySettings);


router.put('/:tenantId/two-factor', checkAdminPermission, SecurityController.updateTwoFactor);


router.get('/:tenantId', checkAdminPermission, SecurityController.getSecuritySettings);


router.put('/:tenantId/password-policy', checkAdminPermission, SecurityController.updatePasswordPolicy);


router.get('/:tenantId/access-logs', checkAdminPermission, SecurityController.getAccessLogs);


router.delete('/:tenantId', checkAdminPermission, SecurityController.deleteSecuritySettings);

module.exports = router;
