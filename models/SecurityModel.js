const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  twoFactorEnabled: { type: Boolean, default: false },
  passwordPolicy: {
    minLength: { type: Number, default: 8 },
    requireNumbers: { type: Boolean, default: true },
    requireSpecialCharacters: { type: Boolean, default: true },
  },
  accessLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AccessLog' }],
}, { timestamps: true });

module.exports = mongoose.model('Security', securitySchema);
