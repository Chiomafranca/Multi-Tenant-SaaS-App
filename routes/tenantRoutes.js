const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const {
  checkTenantExists,
  validateTenant,
  checkTenantPlan,
  authenticateTenantOwner
} = require('../middlewares/tenantMiddleware');


router.post('/', validateTenant, checkTenantPlan, tenantController.createTenant);


router.get('/:id', checkTenantExists, tenantController.getTenantById);


router.get('/', tenantController.getAllTenants);


router.put('/:id', authenticateTenantOwner, checkTenantExists, validateTenant, checkTenantPlan, tenantController.updateTenant);


router.delete('/:id', authenticateTenantOwner, checkTenantExists, tenantController.deleteTenant);


router.patch('/:id/suspend', authenticateTenantOwner, checkTenantExists, tenantController.suspendTenant);

module.exports = router;
