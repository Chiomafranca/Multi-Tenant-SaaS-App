const Subscription = require('../models/SubscriptionModel')


const createSubscription = async (req, res) => {
    try {
        const { tenant, stripeCustomerId, stripeSubscriptionId, planType, endDate } = req.body;
        const subscription = new Subscription({ tenant, stripeCustomerId, stripeSubscriptionId, planType, endDate });
        await subscription.save();
        res.status(201).json({ message: 'Subscription created', subscription });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) return res.status(400).json({ message: 'Subscription not found' });

        res.json(subscription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.json(subscriptions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subscription) return res.status(400).json({ message: 'Subscription not found' });
        res.json({ message: 'Subscription updated', subscription });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
        res.send({ message: 'Subscription deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deactivateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

        subscription.status = 'canceled';
        await subscription.save();

        res.json({ message: 'Subscription deactivated', subscription });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createSubscription,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
    deactivateSubscription,
    deleteSubscription
};
