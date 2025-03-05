// controllers/BillingPaymentController.js
const BillingPayment = require('../models/BillingPayment');



exports.createOrUpdateBillingPayment = async (req, res) => {
  try {
    const { tenantId, stripeCustomerId, stripeSubscriptionId, subscriptionPlan, subscriptionStatus, totalAmountDue, nextBillingDate } = req.body;

    let billingPayment = await BillingPayment.findOne({ tenantId });

    if (billingPayment) {
      // Update existing BillingPayment
      billingPayment.stripeCustomerId = stripeCustomerId || billingPayment.stripeCustomerId;
      billingPayment.stripeSubscriptionId = stripeSubscriptionId || billingPayment.stripeSubscriptionId;
      billingPayment.subscriptionPlan = subscriptionPlan || billingPayment.subscriptionPlan;
      billingPayment.subscriptionStatus = subscriptionStatus || billingPayment.subscriptionStatus;
      billingPayment.totalAmountDue = totalAmountDue || billingPayment.totalAmountDue;
      billingPayment.nextBillingDate = nextBillingDate || billingPayment.nextBillingDate;
      await billingPayment.save();
      return res.status(200).json(billingPayment);
    } else {
      // Create new BillingPayment
      billingPayment = new BillingPayment({
        tenantId,
        stripeCustomerId,
        stripeSubscriptionId,
        subscriptionPlan,
        subscriptionStatus,
        totalAmountDue,
        nextBillingDate,
      });
      await billingPayment.save();
      return res.status(201).json(billingPayment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a Payment to an Invoice
exports.addPayment = async (req, res) => {
  try {
    const { tenantId, invoiceNumber, amountPaid, paymentMethod } = req.body;

    let billingPayment = await BillingPayment.findOne({ tenantId });

    if (!billingPayment) {
      return res.status(404).json({ message: 'Billing data not found' });
    }

    const invoice = billingPayment.invoices.find(inv => inv.invoiceNumber === invoiceNumber);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const payment = {
      amountPaid,
      paymentDate: new Date(),
      paymentMethod,
      status: 'success',
    };

    invoice.payments.push(payment);
    invoice.status = invoice.amount === invoice.payments.reduce((total, pmt) => total + pmt.amountPaid, 0) ? 'paid' : 'unpaid';
    await billingPayment.save();

    res.status(200).json({ message: 'Payment added successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Billing/Payment Info for a Tenant
exports.getBillingPaymentInfo = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const billingPayment = await BillingPayment.findOne({ tenantId }).populate('tenantId');

    if (!billingPayment) {
      return res.status(404).json({ message: 'Billing data not found' });
    }

    res.status(200).json(billingPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Billing/Payment Info
exports.getAllBillingPayments = async (req, res) => {
  try {
    const billingPayments = await BillingPayment.find().populate('tenantId');

    if (!billingPayments.length) {
      return res.status(404).json({ message: 'No billing data found' });
    }

    res.status(200).json(billingPayments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Billing/Payment Info for a Tenant
exports.updateBillingPayment = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { stripeCustomerId, stripeSubscriptionId, subscriptionPlan, subscriptionStatus, totalAmountDue, nextBillingDate } = req.body;

    const billingPayment = await BillingPayment.findOne({ tenantId });

    if (!billingPayment) {
      return res.status(404).json({ message: 'Billing data not found' });
    }

    // Update the relevant fields
    billingPayment.stripeCustomerId = stripeCustomerId || billingPayment.stripeCustomerId;
    billingPayment.stripeSubscriptionId = stripeSubscriptionId || billingPayment.stripeSubscriptionId;
    billingPayment.subscriptionPlan = subscriptionPlan || billingPayment.subscriptionPlan;
    billingPayment.subscriptionStatus = subscriptionStatus || billingPayment.subscriptionStatus;
    billingPayment.totalAmountDue = totalAmountDue || billingPayment.totalAmountDue;
    billingPayment.nextBillingDate = nextBillingDate || billingPayment.nextBillingDate;

    await billingPayment.save();

    res.status(200).json(billingPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Billing/Payment Info for a Tenant
exports.deleteBillingPayment = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const billingPayment = await BillingPayment.findOneAndDelete({ tenantId });

    if (!billingPayment) {
      return res.status(404).json({ message: 'Billing data not found' });
    }

    res.status(200).json({ message: 'Billing data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
