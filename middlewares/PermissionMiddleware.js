// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authenticate user by verifying JWT token
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Authorize permission based on the role
const authorizePermission = (requiredRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming role is stored in the JWT or user model

    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    next();
  };
};

module.exports = { authenticate, authorizePermission };
