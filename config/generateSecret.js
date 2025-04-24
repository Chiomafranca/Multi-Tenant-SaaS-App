// config/generateSecret.js
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

// Generate a secure secret
const secretKey = crypto.randomBytes(64).toString('hex'); 
console.log('Generated JWT_SECRET:', secretKey);

process.env.SECRET_KEY= secretKey; 
