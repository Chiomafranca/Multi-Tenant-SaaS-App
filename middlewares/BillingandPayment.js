const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Import the User model

// Authentication middleware to verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Optionally, add user info (like roles) to the request object
    const user = await User.findById(req.user.id);
    req.user.role = user.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Authorization middleware to restrict access to certain roles
const authorizeBilling = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  };
};

module.exports = { authenticate, authorizeBilling };
