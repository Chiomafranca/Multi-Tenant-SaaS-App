const Subscription = require('../models/SubscriptionModel');

// Check if subscription exists
const checkSubscriptionExists = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    req.subscription = subscription; // Pass subscription to next middleware/controller
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Validate subscription data before creating or updating
const validateSubscriptionData = (req, res, next) => {
  const { tenant, stripeCustomerId, stripeSubscriptionId, planType, endDate } = req.body;
  if (!tenant || !stripeCustomerId || !stripeSubscriptionId || !planType || !endDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
};

module.exports = { checkSubscriptionExists, validateSubscriptionData };
