const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Example: 'read_users', 'manage_tenants'
  description: { type: String } // Optional field for permission description
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);
