const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user is authenticated
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Authentication error', error });
  }
};

// Middleware to authorize the user based on roles or other checks
const authorizeNotification = (roles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // Check if the user has the appropriate role (for example, admin or the user accessing their own data)
      if (roles.includes(user.role) || user._id.toString() === req.params.userId) {
        next();
      } else {
        return res.status(403).json({ message: 'Not authorized' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Authorization error', error });
    }
  };
};

module.exports={authenticate, authorizeNotification}