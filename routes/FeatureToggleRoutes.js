const express = require('express');
const router = express.Router();
const {
  createFeatureToggle,
  updateFeatureToggle,
  deleteFeatureToggle,
  getFeatureTogglesForTenant,
  getAllFeatureToggles,
  getSingleFeatureToggle
} = require('../controllers/featureToggleController');

// Create a new feature toggle
router.post('/', createFeatureToggle);

// Get all toggles for a tenant
// router.get('/:tenantId',  getSingleFeatureToggle,);

// Get a specific toggle by tenantId and featureName
router.get('/:tenantId/:featureName', getSingleFeatureToggle);

// Update a toggle (by tenantId + featureName)
router.put('/:tenantId/:featureName', updateFeatureToggle);

// Delete a toggle (by tenantId + featureName)
router.delete('/:tenantId/:featureName', deleteFeatureToggle);

// Admin: Get all toggles across all tenants
router.get('/', getAllFeatureToggles);

module.exports = router;
