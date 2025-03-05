const express = require('express');
const router = express.Router();
const APIKeyController = require('../controllers/ApiKeyController');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware'); 
const authenticate = require('../middleware/authMiddleware'); 
const authorize = require('../middleware/roleMiddleware'); 

// Apply authentication and role-based authorization where necessary
router.post('/api-keys', authenticate, authorize(['admin']), APIKeyController.createAPIKey);
router.get('/api-keys/tenant/:tenantId', authenticate, authorize(['admin', 'tenantOwner']), APIKeyController.getTenantAPIKeys);
router.get('/api-keys/:id', authenticate, apiKeyMiddleware, APIKeyController.getAPIKeyById);
router.put('/api-keys/:id', authenticate, apiKeyMiddleware, APIKeyController.updateAPIKey);
router.delete('/api-keys/:id', authenticate, authorize(['admin']), APIKeyController.deleteAPIKey);

module.exports = router;
