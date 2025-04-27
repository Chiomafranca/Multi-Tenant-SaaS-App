const { default: mongoose } = require('mongoose');
const Tenant = require('../models/TenantModel');
const { validateTenantData } = require('../utils/validationUtils');

// Middleware to check if tenant exists
const checkTenantExists = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res
        .status(404)
        .json({ message: `Tenant with ID ${req.params.id} not found` });
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
  const result = validateTenantData({ name, owner, plan });
  console.log(result);
  if (result !== null) {
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
  const user = req.user; // The user object should be populated from the JWT payload
  const tenantId = req.params.tenantId;

  if (!user || !tenantId) {
    return res.status(400).json({ message: 'User or Tenant ID is missing' });
  }

  const tenantIdCheck = new mongoose.Types.ObjectId(tenantId);

  if (
    user.tenant.some(
      (tenant) => tenant._id.toString() === tenantIdCheck.toString()
    )
  ) {
    console.log('Authorized');
    return next();
  }

  return res
    .status(403)
    .json({ message: 'You are not authorized to access this tenant' });
};

module.exports = authenticateTenantOwner;

module.exports = {
  checkTenantExists,
  validateTenant,
  checkTenantPlan,
  authenticateTenantOwner,
};
