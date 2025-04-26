// controllers/featureToggleController.js
const FeatureToggle = require('../models/FeatureToggleModel');


// Create a new feature toggle
const createFeatureToggle = async (req, res) => {
  const { tenantId, featureName, enabled } = req.body;

  try {
    if (!tenantId || !featureName) {
      return res.status(400).json({ message: 'Tenant ID and feature name are required.' });
    }

    const existingToggle = await FeatureToggle.findOne({ tenantId, featureName });
    if (existingToggle) {
      return res.status(400).json({ message: `Feature "${featureName}" already exists for this tenant.` });
    }

    const newToggle = new FeatureToggle({ tenantId, featureName, enabled });
    await newToggle.save();

    return res.status(201).json({
      message: `Feature "${featureName}" created for Tenant ${tenantId}.`,
      toggle: newToggle
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while creating the feature toggle.',
      error
    });
  }
};

// Update an existing feature toggle
const updateFeatureToggle = async (req, res) => {
  const { tenantId, featureName, enabled } = req.body;

  try {
    if (!tenantId || !featureName) {
      return res.status(400).json({ message: 'Tenant ID and feature name are required.' });
    }

    const toggle = await FeatureToggle.findOneAndUpdate(
      { tenantId, featureName },
      { enabled },
      { new: true }
    );

    if (!toggle) {
      return res.status(404).json({ message: `Feature "${featureName}" not found for Tenant ${tenantId}.` });
    }

    return res.status(200).json({
      message: `Feature "${featureName}" for Tenant ${tenantId} has been updated.`,
      toggle
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while updating the feature toggle.',
      error
    });
  }
};

// Delete a feature toggle
const deleteFeatureToggle = async (req, res) => {
  const { tenantId, featureName } = req.params;

  try {
    if (!tenantId || !featureName) {
      return res.status(400).json({ message: 'Tenant ID and feature name are required.' });
    }

    const toggle = await FeatureToggle.findOneAndDelete({ tenantId, featureName });

    if (!toggle) {
      return res.status(404).json({ message: `Feature "${featureName}" not found for Tenant ${tenantId}.` });
    }

    return res.status(200).json({
      message: `Feature "${featureName}" for Tenant ${tenantId} has been deleted.`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while deleting the feature toggle.',
      error
    });
  }
};

// Get all feature toggles for a tenant
// Get one specific feature toggle for a tenant
const getSingleFeatureToggle = async (req, res) => {
  const { tenantId, featureName } = req.params;

  try {
    const toggle = await FeatureToggle.findOne({ tenantId, featureName });

    if (!toggle) {
      return res.status(404).json({ message: 'Feature toggle not found.' });
    }

    return res.status(200).json(toggle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving feature toggle.', error });
  }
};


// Get all feature toggles for all tenants
const getAllFeatureToggles = async (req, res) => {
  try {
    const toggles = await FeatureToggle.find();
    return res.status(200).json(toggles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while retrieving feature toggles.',
      error
    });
  }
};

module.exports = {
  createFeatureToggle,
  updateFeatureToggle,
  deleteFeatureToggle,
  getSingleFeatureToggle,
  getAllFeatureToggles
};
