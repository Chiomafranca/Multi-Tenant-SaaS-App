const UsageAnalytics = require('../models/UsageAnalytics');
const { validateUsageData } = require('../utils/validationUtils'); // Assuming you have a validation utility

// Middleware to check if usage record exists
const checkUsageExists = async (req, res, next) => {
  try {
    const usage = await UsageAnalytics.findById(req.params.id);
    if (!usage) {
      return res.status(404).json({ message: 'Usage record not found' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to validate usage data
const validateUsage = (req, res, next) => {
  const { tenantId, userId, feature } = req.body;
  const { error } = validateUsageData({ tenantId, userId, feature }); // Assume this function validates the data
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware to check if tenant has access to usage data (Optional)
const authenticateTenantAccess = (req, res, next) => {
  const user = req.user; // Assuming the user is set in the request object after authentication
  const tenantId = req.params.tenantId || req.body.tenantId;

  if (user && user.tenantId === tenantId) {
    return next();
  } else {
    return res.status(403).json({ message: 'You are not authorized to access this tenant\'s usage data' });
  }
};

module.exports = {
  checkUsageExists,
  validateUsage,
  authenticateTenantAccess
};
