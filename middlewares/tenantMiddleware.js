const Tenant = require('../models/TenantModel');
const { validateTenantData } = require('../utils/validationUtils');

// Middleware to check if tenant exists
const checkTenantExists = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id); 
    if (!tenant) {
      return res.status(404).json({ message: `Tenant with ID ${req.params.id} not found` });

    }
    req.tenant = tenant; 
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to validate tenant data
const validateTenant = (req, res, next) => {
  const { name, owner, plan } = req.body;
  const { error } = validateTenantData({ name, owner, plan });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware to check tenant plan validity
const checkTenantPlan = (req, res, next) => {
  const { plan } = req.body;
  const validPlans = ['basic', 'premium', 'enterprise'];
  if (!validPlans.includes(plan)) {
    return res.status(400).json({ message: 'Invalid plan type' });
  }
  next();
};

// Middleware to authenticate tenant owner
// Middleware to authenticate tenant owner
const authenticateTenantOwner = (req, res, next) => {
  const user = req.user;  // The user object should be populated from the JWT payload
  const tenantId = req.params.tenant;

  console.log('User:', user);  // Log the user object
  console.log('Tenant ID from request:', tenantId);  // Log tenant ID from URL

  if (!user || !tenantId) {
    return res.status(400).json({ message: 'User or Tenant ID is missing' });
  }

  console.log('User Tenant ID:', user.tenantId);  // Log the tenantId from the decoded token
  console.log('Tenant ID from Request:', tenantId);  // Log the tenant ID from the request

  // Compare tenantId in request with tenantId in user object
  if (user.tenantId && tenantId && user.tenantId === tenantId) {
    return next();  // Proceed to the next middleware or route handler
  }

  return res.status(403).json({ message: 'You are not authorized to access this tenant' });
};

module.exports = authenticateTenantOwner;




module.exports = {
  checkTenantExists,
  validateTenant,
  checkTenantPlan,
  authenticateTenantOwner,
};
