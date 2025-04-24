const Settings = require('../models/Settings');

// Get settings for a tenant
const getSettings = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const settings = await Settings.findOne({ tenantId });

    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create or update settings for a tenant
const updateSettings = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const updates = req.body;

    const settings = await Settings.findOneAndUpdate(
      { tenantId },
      updates,
      { new: true, upsert: true } // Create if not exist
    );

    res.status(200).json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tenants' settings
const getAllSettings = async (req, res) => {
    try {
      const settings = await Settings.find();
      res.status(200).json(settings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Reset settings to default for a tenant
const resetSettings = async (req, res) => {
  try {
    const { tenantId } = req.params;

    await Settings.findOneAndUpdate(
      { tenantId },
      {
        general: { appName: 'My SaaS App', theme: 'light', language: 'en' },
        billing: { currency: 'USD', taxRate: 0 },
        notifications: { emailNotifications: true, smsNotifications: false },
      },
      { new: true }
    );

    res.status(200).json({ message: 'Settings reset to default' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete settings for a tenant (Not common, but useful)
const deleteSettings = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const settings = await Settings.findOneAndDelete({ tenantId });
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.status(200).json({ message: 'Settings deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={getSettings, updateSettings, getAllSettings, resetSettings, deleteSettings}