const mongoose = require('mongoose')

// User Model (User.js)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  });
  module.exports = mongoose.model('User', userSchema);
  