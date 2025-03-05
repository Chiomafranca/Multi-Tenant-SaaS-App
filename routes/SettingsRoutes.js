const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/SettingsController');
const { authenticate, authorizeRole } = require('../middleware/roleMiddleware');
const { checkSettingsExists } = require('../middleware/settingsMiddleware');


router.get('/settings/:tenantId', authenticate, checkSettingsExists, SettingsController.getSettings);


router.get('/settings', authenticate, authorizeRole(['admin']), SettingsController.getAllSettings);


router.put('/settings/:tenantId', authenticate, authorizeRole(['admin']), SettingsController.updateSettings);


router.post('/settings/:tenantId/reset', authenticate, authorizeRole(['admin']), checkSettingsExists, SettingsController.resetSettings);


router.delete('/settings/:tenantId', authenticate, authorizeRole(['admin']), checkSettingsExists, SettingsController.deleteSettings);

module.exports = router;
