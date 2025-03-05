const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }] // Example: ['read_users', 'manage_tenants', 'delete_accounts']
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
