const express = require('express');
const router = express.Router();
const usageAnalyticsController = require('../controllers/usageAnalyticsController');
const {
  checkUsageExists,
  validateUsage,
  authenticateTenantAccess
} = require('../middleware/usageAnalyticsMiddleware');


router.post('/', validateUsage, usageAnalyticsController.trackUsage);


router.get('/tenant/:tenantId', authenticateTenantAccess, usageAnalyticsController.getTenantUsage);


router.get('/feature/:feature', usageAnalyticsController.getUsageByFeature);


router.get('/:id', checkUsageExists, usageAnalyticsController.getUsageById);


router.put('/:id', checkUsageExists, validateUsage, usageAnalyticsController.updateUsage);


router.delete('/:id', checkUsageExists, usageAnalyticsController.deleteUsage);

module.exports = router;
