const express = require('express');
const router = express.Router();
const { authenticate, authorizeBilling } = require('../middleware/authMiddleware');
const { createOrUpdateBillingPayment, addPayment, getBillingPaymentInfo, getAllBillingPayments, updateBillingPayment, deleteBillingPayment } = require('../controllers/BillingandPaymentController');


router.post('/billing-payment', authenticate, authorizeBilling(['admin', 'finance']), createOrUpdateBillingPayment);


router.post('/billing-payment/payment', authenticate, authorizeBilling(['admin', 'finance']), addPayment);


router.get('/billing-payment/:tenantId', authenticate, authorizeBilling(['admin', 'finance', 'accountant']), getBillingPaymentInfo)


router.get('/billing-payment', authenticate, authorizeBilling(['admin', 'finance', 'accountant']), getAllBillingPayments);


router.put('/billing-payment/:tenantId', authenticate, authorizeBilling(['admin', 'finance']), updateBillingPayment);

router.delete('/billing-payment/:tenantId', authenticate, authorizeBilling(['admin', 'finance']), deleteBillingPayment);

module.exports = router;
