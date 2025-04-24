const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  action: { type: String, required: true }, // e.g., "LOGIN", "UPDATE_PROFILE"
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
