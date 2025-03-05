// models/BillingPayment.js
const mongoose = require('mongoose');

const billingPaymentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  stripeCustomerId: { type: String, required: true },
  stripeSubscriptionId: { type: String, required: true },
  subscriptionPlan: { type: String, enum: ['basic', 'premium', 'enterprise'], required: true },
  subscriptionStatus: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'active' },
  nextBillingDate: { type: Date },
  totalAmountDue: { type: Number, default: 0 },
  outstandingAmount: { type: Number, default: 0 },
  
  // Payment info
  invoices: [{
    invoiceNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' },
    issuedDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal'], required: true },
    payments: [{
      amountPaid: { type: Number, required: true },
      paymentDate: { type: Date, default: Date.now },
      status: { type: String, enum: ['success', 'failed'], default: 'success' },
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('BillingPayment', billingPaymentSchema);
