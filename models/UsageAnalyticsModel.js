// models/UsageAnalytics.js
const mongoose = require('mongoose');

const usageAnalyticsSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  feature: { type: String, required: true }, 
  usageCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UsageAnalytics', usageAnalyticsSchema);
