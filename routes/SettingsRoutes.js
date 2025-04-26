const express = require('express');
const router = express.Router();
const { auth, authorizeRole } = require('../middlewares/roleMiddleware');
const { checkSettingsExists } = require('../middlewares/settingsMiddleware');
const { getSettings, getAllSettings, updateSettings, resetSettings, deleteSettings } = require('../controllers/SettingController');


router.get('/:tenantId', auth, checkSettingsExists, getSettings);


router.get('/', authorizeRole(['admin']),   getAllSettings);


router.put('/:tenantId', auth, authorizeRole(['admin']), updateSettings);


router.post('/:tenantId/reset', auth,  resetSettings);


router.delete('/:tenantId', auth, authorizeRole(['admin']), checkSettingsExists, deleteSettings);


module.exports = router;
