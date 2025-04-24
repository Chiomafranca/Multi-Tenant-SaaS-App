const express = require('express');
const router = express.Router();

const {
  checkTenantExists,
  validateTenant,
  checkTenantPlan,
  authenticateTenantOwner
} = require('../middlewares/tenantMiddleware');
const { createTenant, getTenantById, getAllTenants, updateTenant, deleteTenant, suspendTenant } = require('../controllers/tenantController');


router.post('/', validateTenant, checkTenantPlan, createTenant);


router.get('/:id', checkTenantExists, getTenantById);


router.get('/', getAllTenants);


router.put('/:id', authenticateTenantOwner, checkTenantExists, validateTenant, checkTenantPlan, updateTenant);


router.delete('/:id', authenticateTenantOwner, checkTenantExists, deleteTenant);


router.patch('/:id/suspend', authenticateTenantOwner, checkTenantExists, suspendTenant);

module.exports = router;
