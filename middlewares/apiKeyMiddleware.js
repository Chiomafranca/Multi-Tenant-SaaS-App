const APIKey = require('../models/APIKeyModel');

const apiKeyMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    // Ensure the token is in the correct format: "Bearer <token>"
    const token = authHeader.split(' ')[1];  
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Verify the token exists in your APIKeyModel and is active
    const validKey = await APIKey.findOne({ key: token, isActive: true });
    if (!validKey) {
      return res.status(403).json({ message: 'Invalid or inactive API key' });
    }

    req.apiKey = validKey;
    next();
  } catch (error) {
    console.error(error); // Log for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = apiKeyMiddleware;
