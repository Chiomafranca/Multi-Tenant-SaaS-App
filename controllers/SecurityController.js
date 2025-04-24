const Security = require('../models/Security');
const AccessLog = require('../models/AccessLog');

// Create security settings for a tenant
const createSecuritySettings = async (req, res) => {
  try {
    const { tenantId } = req.params;
    
    // Check if security settings already exist for the tenant
    let existingSettings = await Security.findOne({ tenantId });
    if (existingSettings) {
      return res.status(400).json({ message: 'Security settings already exist for this tenant' });
    }

    const securitySettings = new Security({
      tenantId,
      twoFactorEnabled: false,  // Default value
      passwordPolicy: {
        minLength: 8,
        requireNumbers: true,
        requireSpecialCharacters: true,
      }
    });

    await securitySettings.save();
    res.status(201).json({ message: 'Security settings created', securitySettings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Two-Factor Authentication setting
const updateTwoFactor = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { twoFactorEnabled } = req.body;

    let securitySettings = await Security.findOne({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    securitySettings.twoFactorEnabled = twoFactorEnabled;
    await securitySettings.save();

    res.status(200).json({ message: 'Two-factor authentication settings updated', securitySettings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get security settings for a tenant
const getSecuritySettings = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const securitySettings = await Security.findOne({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    res.status(200).json(securitySettings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update password policy
const updatePasswordPolicy = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { minLength, requireNumbers, requireSpecialCharacters } = req.body;

    let securitySettings = await Security.findOne({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    securitySettings.passwordPolicy = { minLength, requireNumbers, requireSpecialCharacters };
    await securitySettings.save();

    res.status(200).json({ message: 'Password policy updated', securitySettings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all access logs for a tenant
const getAccessLogs = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const securitySettings = await Security.findOne({ tenantId }).populate('accessLogs');
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    res.status(200).json(securitySettings.accessLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete security settings for a tenant
const deleteSecuritySettings = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const securitySettings = await Security.findOneAndDelete({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    res.status(200).json({ message: 'Security settings deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={createSecuritySettings,
   getSecuritySettings,
    updateTwoFactor,
     getAccessLogs,
     updatePasswordPolicy,
     deleteSecuritySettings
    }
