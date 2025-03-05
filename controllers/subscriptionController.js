const Subscription = require('../models/SubscriptionModel');


//create Subscription 
exports.createSubscription = async () =>{
   
    try {
        const { tenant, stripeCustomerId, stripeSubscriptionId, planType, endDate } = req.body;
        const subscription = new Subscription({tenant, stripeCustomerId, stripeSubscriptionId, planType, endDate});
        await subscription.save();
        res.status(201).json({message: 'Subscription created', subscription})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// get Subscription 
exports.getSubscription = async () =>{

    try {
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription) return res.status(400).json({message: 'Subscription not found'});

        res.json(subscription);

    } catch (error) {
        res.status(400).json({message: error.message })
    }
};

//get All Subscriptions
exports.getAllSubscriptions = async () =>{
    try {
        const subscriptions = await Subscription.find();
        res.json(subscriptions)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//Update Subscription
exports.updateSubscription = async () =>{

    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!subscription) return res.status(400).json({message: 'Subscription not found'});
        res.json({message: 'Subscription updated', subscription})
    } catch (error) {
        res.status(400).json({message: eror.message})
    }
};

//delete Subscription

exports.deleteSubscription = async () =>{
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if(!subscription) return res.status(404).json({message: 'Subscription not found'});
        res.send({message: 'Subscription deleted'});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//deactivate Subscription 
exports.deactivateSubscription = async () =>{

      try {
        const subscription = await Subscription.findById(req.params.is);
        if(!subscription) return res.status(404).json({message: 'Subscription not found' });

        subscription.status = 'canceled';

        await subscription.save()

        res.json({ message: 'Subscription deactivated', subscription });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}