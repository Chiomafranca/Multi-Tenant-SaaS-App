const UsageAnalytics = require('../models/UsageAnalytics');
const { validateUsageData } = require('../utils/validationUtils'); 



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


const validateUsage = (req, res, next) => {
  const { tenantId, userId, feature } = req.body;
  const { error } = validateUsageData({ tenantId, userId, feature }); 
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};


const authenticateTenantAccess = (req, res, next) => {
  const user = req.user;
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
