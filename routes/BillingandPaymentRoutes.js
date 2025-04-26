const express = require('express');
const router = express.Router();
const { auth, authorizeBilling } = require('../middlewares/BillingandPayment');
const { createOrUpdateBillingPayment, addPayment, getBillingPaymentInfo, getAllBillingPayments, updateBillingPayment, deleteBillingPayment } = require('../controllers/BillingandPaymentController');

// Create or Update Billing Payment
router.post('/', auth, authorizeBilling(['admin', 'finance']), createOrUpdateBillingPayment);

// Add Payment to an Invoice
router.post('/payment', auth, authorizeBilling(['admin', 'finance']), addPayment);

// Get Billing/Payment Info for a Tenant
router.get('/:tenantId', auth, authorizeBilling(['admin', 'finance', 'accountant']), getBillingPaymentInfo);

// Get All Billing/Payment Info
router.get('/', auth, authorizeBilling(['admin', 'finance', 'accountant']), getAllBillingPayments);

// Update Billing/Payment Info for a Tenant
router.put('/:tenantId', auth, authorizeBilling(['admin', 'finance']), updateBillingPayment);

// Delete Billing/Payment Info for a Tenant
router.delete('/:tenantId', auth, authorizeBilling(['admin', 'finance']), deleteBillingPayment);

module.exports = router;
