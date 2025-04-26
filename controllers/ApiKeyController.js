const APIKey = require("../models/APIKeyModel");

// Create API Key
const crypto = require("crypto");

const createAPIKey = async (req, res) => {
  try {
    const { tenantId } = req.body;

    // Generate a random 64-character API key
    const key = crypto.randomBytes(32).toString("hex");

    const apiKey = new APIKey({
      tenantId,
      key,
    });

    await apiKey.save();
    res.status(201).json({ message: "API key created", apiKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create API key" });
  }
};


const getAllAPIKeys = async (req, res) => {
  try {
    const apiKeys = await APIKey.find(); // no tenantId filter
    res.status(200).json(apiKeys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single API key by ID
const getAPIKeyById = async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = await APIKey.findById(id);

    if (!apiKey) {
      return res.status(404).json({ message: "API Key not found" });
    }

    res.status(200).json(apiKey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update API Key (e.g., change scopes)
const updateAPIKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, scopes, isActive } = req.body;

    const apiKey = await APIKey.findByIdAndUpdate(
      id,
      { name, scopes, isActive },
      { new: true }
    );

    if (!apiKey) {
      return res.status(404).json({ message: "API Key not found" });
    }

    res.status(200).json({ message: "API Key updated successfully", apiKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete API Key
const deleteAPIKey = async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = await APIKey.findByIdAndDelete(id);

    if (!apiKey) {
      return res.status(404).json({ message: "API Key not found" });
    }

    res.status(200).json({ message: "API Key deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAPIKey,
  getAllAPIKeys,
  getAPIKeyById,
  updateAPIKey,
  deleteAPIKey,
};
