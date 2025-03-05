const express = require('express');
const router = express.Router();
const featureToggleController = require('../controllers/FeatureToggleController');
const { authenticate, authorizeFeatureToggle } = require('../middleware/authMiddleware');


router.post('/create', authenticate, authorizeFeatureToggle(['admin', 'devops']), featureToggleController.createFeatureToggle);


router.put('/update', authenticate, authorizeFeatureToggle(['admin', 'devops']), featureToggleController.updateFeatureToggle);


router.delete('/:tenantId/:featureName', authenticate, authorizeFeatureToggle(['admin', 'devops']), featureToggleController.deleteFeatureToggle);

router.get('/:tenantId', authenticate, authorizeFeatureToggle(['admin', 'devops', 'tenant-manager']), featureToggleController.getFeatureTogglesForTenant);

router.get('/', authenticate, authorizeFeatureToggle(['admin']), featureToggleController.getAllFeatureToggles);

module.exports = router;
