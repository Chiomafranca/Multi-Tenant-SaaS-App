const express = require('express');
const router = express.Router();
const BillingPaymentController = require('../controllers/BillingPaymentController');
const { authenticate, authorizeBilling } = require('../middleware/authMiddleware');


router.post('/billing-payment', authenticate, authorizeBilling(['admin', 'finance']), BillingPaymentController.createOrUpdateBillingPayment);


router.post('/billing-payment/payment', authenticate, authorizeBilling(['admin', 'finance']), BillingPaymentController.addPayment);


router.get('/billing-payment/:tenantId', authenticate, authorizeBilling(['admin', 'finance', 'accountant']), BillingPaymentController.getBillingPaymentInfo);


router.get('/billing-payment', authenticate, authorizeBilling(['admin', 'finance', 'accountant']), BillingPaymentController.getAllBillingPayments);


router.put('/billing-payment/:tenantId', authenticate, authorizeBilling(['admin', 'finance']), BillingPaymentController.updateBillingPayment);

router.delete('/billing-payment/:tenantId', authenticate, authorizeBilling(['admin', 'finance']), BillingPaymentController.deleteBillingPayment);

module.exports = router;
