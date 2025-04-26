const express = require('express');
const router = express.Router();
const { auth, authorizeRole } = require('../middlewares/roleMiddleware');
const { checkSubscriptionExists, validateSubscriptionData } = require('../middlewares/subscriptionMiddleware');
const { createSubscription, getSubscription, getAllSubscriptions, updateSubscription, deleteSubscription, deactivateSubscription } = require('../controllers/subscriptionController');


router.post('/', auth, validateSubscriptionData, createSubscription);


router.get('/:id', auth, checkSubscriptionExists, getSubscription);


router.get('/', auth, authorizeRole(['admin']), getAllSubscriptions);


router.put('/:id', auth, authorizeRole(['admin', 'manager']), checkSubscriptionExists, validateSubscriptionData, updateSubscription);


router.delete('/:id', auth, authorizeRole(['admin']), checkSubscriptionExists, deleteSubscription);

router.patch('/:id/deactivate', auth, authorizeRole(['admin', 'manager']), checkSubscriptionExists, deactivateSubscription);

module.exports = router;
