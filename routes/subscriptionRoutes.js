const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate, authorizeRole } = require('../middlewares/roleMiddleware');
const { checkSubscriptionExists, validateSubscriptionData } = require('../middlewares/subscriptionMiddleware');


router.post('/', authenticate, authorizeRole(['admin', 'manager']), validateSubscriptionData, subscriptionController.createSubscription);


router.get('/:id', authenticate, checkSubscriptionExists, subscriptionController.getSubscription);


router.get('/', authenticate, authorizeRole(['admin']), subscriptionController.getAllSubscriptions);


router.put('/:id', authenticate, authorizeRole(['admin', 'manager']), checkSubscriptionExists, validateSubscriptionData, subscriptionController.updateSubscription);


router.delete('/:id', authenticate, authorizeRole(['admin']), checkSubscriptionExists, subscriptionController.deleteSubscription);

router.patch('/:id/deactivate', authenticate, authorizeRole(['admin', 'manager']), checkSubscriptionExists, subscriptionController.deactivateSubscription);

module.exports = router;
