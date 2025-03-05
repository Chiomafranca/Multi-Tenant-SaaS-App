const APIKey = require('../models/APIKey');

// Create API Key
exports.createAPIKey = async (req, res) => {
  try {
    const { tenantId, name, scopes } = req.body;

    const apiKey = new APIKey({
      tenantId,
      key: APIKey.generateKey(),
      name,
      scopes,
    });

    await apiKey.save();
    res.status(201).json({ message: 'API Key created successfully', apiKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all API keys for a tenant
exports.getTenantAPIKeys = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const apiKeys = await APIKey.find({ tenantId });

    res.status(200).json(apiKeys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single API key by ID
exports.getAPIKeyById = async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = await APIKey.findById(id);

    if (!apiKey) {
      return res.status(404).json({ message: 'API Key not found' });
    }

    res.status(200).json(apiKey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update API Key (e.g., change scopes)
exports.updateAPIKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, scopes, isActive } = req.body;

    const apiKey = await APIKey.findByIdAndUpdate(
      id,
      { name, scopes, isActive },
      { new: true }
    );

    if (!apiKey) {
      return res.status(404).json({ message: 'API Key not found' });
    }

    res.status(200).json({ message: 'API Key updated successfully', apiKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete API Key
exports.deleteAPIKey = async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = await APIKey.findByIdAndDelete(id);

    if (!apiKey) {
      return res.status(404).json({ message: 'API Key not found' });
    }

    res.status(200).json({ message: 'API Key deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
