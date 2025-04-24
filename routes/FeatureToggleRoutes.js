const express = require('express');
const router = express.Router();
const { authenticate, authorizeFeatureToggle } = require('../middleware/authMiddleware');
const { createFeatureToggle, updateFeatureToggle, deleteFeatureToggle, getAllFeatureToggles, getFeatureTogglesForTenant } = require('../controllers/FeatureToggleController');


router.post('/create', authenticate, authorizeFeatureToggle(['admin', 'devops']), createFeatureToggle);


router.put('/update', authenticate, authorizeFeatureToggle(['admin', 'devops']), updateFeatureToggle);


router.delete('/:tenantId/:featureName', authenticate, authorizeFeatureToggle(['admin', 'devops']), deleteFeatureToggle);

router.get('/:tenantId', authenticate, authorizeFeatureToggle(['admin', 'devops', 'tenant-manager']), getFeatureTogglesForTenant);

router.get('/', authenticate, authorizeFeatureToggle(['admin']), getAllFeatureToggles);

module.exports = router;
