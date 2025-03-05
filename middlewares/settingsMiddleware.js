const Settings = require('../models/Settings');

// Middleware to check if settings exist for a tenant
const checkSettingsExists = async (req, res, next) => {
  try {
    const { tenantId } = req.params;

    const settings = await Settings.findOne({ tenantId });
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found for this tenant' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  checkSettingsExists,
};
