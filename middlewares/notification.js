const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Middleware to check if the user is authenticated
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

module.exports={auth, authorizeNotification}