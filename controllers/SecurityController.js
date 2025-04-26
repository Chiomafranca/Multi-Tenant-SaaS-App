const mongoose = require('mongoose');
const Security = require('../models/SecurityModel');

// Create security settings for a tenant
const createSecuritySettings = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { twoFactorEnabled, passwordPolicy, accessLogs } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tenantId)) {
      return res.status(400).json({ message: 'Invalid tenantId format' });
    }

    
    const existingSecuritySettings = await Security.findOne({ tenantId });
    if (existingSecuritySettings) {
      return res.status(400).json({ message: 'Security settings already exist for this tenant' });
    }

    // Create new security settings
    const newSecuritySettings = new Security({
      tenantId,
      twoFactorEnabled: twoFactorEnabled ?? false, 
      passwordPolicy: {
        minLength: passwordPolicy?.minLength || 8, // default minLength to 8 if not provided
        requireNumbers: passwordPolicy?.requireNumbers ?? true, // default to true
        requireSpecialCharacters: passwordPolicy?.requireSpecialCharacters ?? true // default to true
      },
      accessLogs: accessLogs ?? [] // default to empty array if not provided
    });

    await newSecuritySettings.save();

    res.status(201).json({ message: 'Security settings created successfully', newSecuritySettings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Two-Factor Authentication setting
const updateTwoFactor = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { twoFactorEnabled } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tenantId)) {
      return res.status(400).json({ message: 'Invalid tenantId format' });
    }

    const securitySettings = await Security.findOne({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    securitySettings.twoFactorEnabled = twoFactorEnabled;
    await securitySettings.save();

    res.status(200).json({ message: 'Two-factor authentication settings updated', securitySettings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get security settings for a tenant
const getSecuritySettings = async (req, res) => {
  try {
    const { tenantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tenantId)) {
      return res.status(400).json({ message: 'Invalid tenantId format' });
    }

    const securitySettings = await Security.findOne({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    res.status(200).json(securitySettings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update password policy
const updatePasswordPolicy = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { minLength, requireNumbers, requireSpecialCharacters } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tenantId)) {
      return res.status(400).json({ message: 'Invalid tenantId format' });
    }

    const securitySettings = await Security.findOne({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    // Update only provided fields
    if (minLength !== undefined) securitySettings.passwordPolicy.minLength = minLength;
    if (requireNumbers !== undefined) securitySettings.passwordPolicy.requireNumbers = requireNumbers;
    if (requireSpecialCharacters !== undefined) securitySettings.passwordPolicy.requireSpecialCharacters = requireSpecialCharacters;

    await securitySettings.save();

    res.status(200).json({ message: 'Password policy updated', securitySettings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get All Securities
const getAllSecurities = async (req, res) => {
  try {
    const securities = await Security.find();
    res.status(200).json(securities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete security settings for a tenant
const deleteSecuritySettings = async (req, res) => {
  try {
    const { tenantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tenantId)) {
      return res.status(400).json({ message: 'Invalid tenantId format' });
    }

    const securitySettings = await Security.findOneAndDelete({ tenantId });
    if (!securitySettings) {
      return res.status(404).json({ message: 'Security settings not found' });
    }

    res.status(200).json({ message: 'Security settings deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSecuritySettings,
  getSecuritySettings,
  updateTwoFactor,
  getAllSecurities,
  updatePasswordPolicy,
  deleteSecuritySettings
};
