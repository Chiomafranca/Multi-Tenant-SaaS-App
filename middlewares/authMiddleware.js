const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/UserModel');

dotenv.config();

const auth = async (req, res, next) => {
  // Extract token from Authorization header or cookies
  let token =
    req.headers['authorization'] &&
    req.headers['authorization'].startsWith('Bearer ')
      ? req.headers['authorization'].split(' ')[1]
      : req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserModel.findById(decoded.id).populate('tenant');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Attach the decoded payload to req.user
    req.user = user;

    // Check if tenantId is missing
    // if (!req.user.tenantId) {
    //   return res.status(403).json({ message: 'Tenant ID is missing in token' });
    // }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT Error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token has expired' });
    }

    res.status(403).json({ message: 'Invalid or malformed token' });
  }
};

module.exports = auth;
