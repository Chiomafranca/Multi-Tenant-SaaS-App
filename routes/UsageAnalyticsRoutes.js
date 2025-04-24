const express = require('express');
const router = express.Router();
const {
  checkUsageExists,
  validateUsage,
  authenticateTenantAccess
} = require('../middleware/usageAnalyticsMiddleware');
const { trackUsage, getTenantUsage, getUsageByFeature, getUsageById, updateUsage, deleteUsage } = require('../controllers/usageAnalyticsController');


router.post('/', validateUsage, trackUsage);


router.get('/tenant/:tenantId', authenticateTenantAccess, getTenantUsage)


router.get('/feature/:feature', getUsageByFeature);


router.get('/:id', checkUsageExists, getUsageById);


router.put('/:id', checkUsageExists, validateUsage, updateUsage);


router.delete('/:id', checkUsageExists, deleteUsage);

module.exports = router;
