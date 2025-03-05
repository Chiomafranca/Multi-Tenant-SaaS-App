const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  stripeCustomerId: { type: String, required: true },
  stripeSubscriptionId: { type: String, required: true },
  planType: { type: String, enum: ['basic', 'pro', 'enterprise'], required: true }, 
  status: { type: String, enum: ['active', 'canceled', 'trial'], default: 'active' },
  startDate: { type: Date, default: Date.now }, 
  endDate: { type: Date }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
