const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/roleMiddleware');
const { checkSettingsExists } = require('../middleware/settingsMiddleware');
const { getSettings, getAllSettings, updateSettings, resetSettings, deleteSettings } = require('../controllers/SettingController');


router.get('/settings/:tenantId', authenticate, checkSettingsExists, getSettings);


router.get('/settings', authenticate, authorizeRole(['admin']), getAllSettings);


router.put('/settings/:tenantId', authenticate, authorizeRole(['admin']), updateSettings);


router.post('/settings/:tenantId/reset', authenticate, authorizeRole(['admin']), checkSettingsExists, resetSettings);


router.delete('/settings/:tenantId', authenticate, authorizeRole(['admin']), checkSettingsExists, deleteSettings);

module.exports = router;
