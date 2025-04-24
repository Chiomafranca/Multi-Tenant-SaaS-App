const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/roleMiddleware');
const { checkSubscriptionExists, validateSubscriptionData } = require('../middlewares/subscriptionMiddleware');
const { createSubscription, getSubscription, getAllSubscriptions, updateSubscription, deleteSubscription, deactivateSubscription } = require('../controllers/subscriptionController');


router.post('/', authenticate, authorizeRole(['admin', 'manager']), validateSubscriptionData, createSubscription);


router.get('/:id', authenticate, checkSubscriptionExists, getSubscription);


router.get('/', authenticate, authorizeRole(['admin']), getAllSubscriptions);


router.put('/:id', authenticate, authorizeRole(['admin', 'manager']), checkSubscriptionExists, validateSubscriptionData, updateSubscription);


router.delete('/:id', authenticate, authorizeRole(['admin']), checkSubscriptionExists, deleteSubscription);

router.patch('/:id/deactivate', authenticate, authorizeRole(['admin', 'manager']), checkSubscriptionExists, deactivateSubscription);

module.exports = router;
