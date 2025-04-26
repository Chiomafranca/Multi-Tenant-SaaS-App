const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); 
const dotenv = require('dotenv');

dotenv.config()

// Authenticate user using JWT
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

// Authorize user based on their role (admin only for role management)
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};

module.exports = { auth, authorizeRole };
