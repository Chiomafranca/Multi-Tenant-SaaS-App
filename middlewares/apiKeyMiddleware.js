const APIKey = require('../models/APIKey');

module.exports = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ message: 'API key required' });

    const validKey = await APIKey.findOne({ key: apiKey, isActive: true });
    if (!validKey) return res.status(403).json({ message: 'Invalid API key' });

    req.apiKey = validKey;
    next();
};
