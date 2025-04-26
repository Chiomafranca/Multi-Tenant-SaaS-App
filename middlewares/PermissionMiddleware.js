// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/PermissionModel');

// Authenticate user by verifying JWT token
const auth = (req, res, next) => {
  let token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ') 
    ? req.headers['authorization'].split(' ')[1] 
    : req.cookies.token;

  console.log("Token extracted:", token);
  console.log('SECRET_KEY in middleware:', process.env.SECRET_KEY);  

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);  
    req.user = decoded;  
    next();  
  } catch (error) {
    console.error("JWT Error:", error);

    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token has expired' });
    }

    
    res.status(403).json({ message: 'Invalid or malformed token' });
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

module.exports = { auth, authorizePermission };
