const UsageAnalytics = require('../models/UsageAnalytics');

// Track usage
exports.trackUsage = async (req, res) => {
  try {
    const { tenantId, userId, feature } = req.body;

   
    let usage = await UsageAnalytics.findOne({
      tenantId,
      userId,
      feature,
      timestamp: { $gte: new Date().setHours(0, 0, 0, 0) }, 
    });

    if (usage) {
      usage.count += 1; 
      await usage.save();
    } else {
      usage = new UsageAnalytics({ tenantId, userId, feature });
      await usage.save();
    }

    res.status(201).json({ message: 'Usage tracked successfully', usage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTenantUsage = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const usage = await UsageAnalytics.find({ tenantId });

    res.status(200).json(usage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getUsageByFeature = async (req, res) => {
  try {
    const { feature } = req.params;

    const usage = await UsageAnalytics.find({ feature });

    res.status(200).json(usage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getUsageById = async (req, res) => {
  try {
    const { id } = req.params;

    const usage = await UsageAnalytics.findById(id);

    if (!usage) {
      return res.status(404).json({ message: 'Usage record not found' });
    }

    res.status(200).json(usage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const { feature, count } = req.body;

    const usage = await UsageAnalytics.findByIdAndUpdate(
      id,
      { feature, count },
      { new: true }
    );

    if (!usage) {
      return res.status(404).json({ message: 'Usage record not found' });
    }

    res.status(200).json({ message: 'Usage record updated successfully', usage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteUsage = async (req, res) => {
  try {
    const { id } = req.params;

    const usage = await UsageAnalytics.findByIdAndDelete(id);

    if (!usage) {
      return res.status(404).json({ message: 'Usage record not found' });
    }

    res.status(200).json({ message: 'Usage record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
