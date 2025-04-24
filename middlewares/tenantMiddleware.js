const Tenant = require('../models/TenantModel');
const { validateTenantData } = require('../utils/validationUtils'); 

// Middleware to check if tenant exists
const checkTenantExists = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to validate tenant data
const validateTenant = (req, res, next) => {
  const { name, owner, plan } = req.body;
  const { error } = validateTenantData({ name, owner, plan }); // Assume this function validates the data
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware to check tenant plan validity (if needed)
const checkTenantPlan = async (req, res, next) => {
  const { plan } = req.body;
  const validPlans = ['basic', 'premium', 'enterprise']; // Example plan types
  if (!validPlans.includes(plan)) {
    return res.status(400).json({ message: 'Invalid plan type' });
  }
  next();
};

// Middleware to authenticate user (e.g., check if the user is logged in)
const authenticateTenantOwner = (req, res, next) => {
  const user = req.user; // Assuming the user is set in the request object after authentication
  const tenantId = req.params.id || req.body.tenantId;

  if (user && user.tenantId === tenantId) {
    return next();
  } else {
    return res.status(403).json({ message: 'You are not authorized to access this tenant' });
  }
};

module.exports = {
  checkTenantExists,
  validateTenant,
  checkTenantPlan,
  authenticateTenantOwner
};
