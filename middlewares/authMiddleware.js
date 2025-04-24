const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const auth = (req, res, next) => {
  let token = req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ') 
    ? req.headers['authorization'].split(' ')[1] 
    : req.cookies.token;

  console.log("Token extracted:", token);
  console.log('SECRET_KEY in middleware:', process.env.SECRET_KEY);  
  console.log("Token received:", token);


  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Verify the token using the JWT_SECRET from .env file
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;  // Attach decoded user info to request
    next();
  } catch (error) {
    console.error("JWT Error:", error);

    // Handle specific errors for expired tokens
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token has expired' });
    }

    // General invalid token error
    res.status(403).json({ message: 'Invalid or malformed token' });
  }
};

module.exports = auth;
