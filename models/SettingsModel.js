const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, unique: true }, 
    general: {
      appName: { type: String, default: 'My SaaS App' },
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      language: { type: String, default: 'en' }
    },
    billing: {
      currency: { type: String, default: 'USD' },
      taxRate: { type: Number, default: 0 } 
    },
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
