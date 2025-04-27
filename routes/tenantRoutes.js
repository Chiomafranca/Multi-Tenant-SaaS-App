const express = require('express');
const router = express.Router();

const {
  checkTenantExists,
  validateTenant,
  checkTenantPlan,
  authenticateTenantOwner,
} = require('../middlewares/tenantMiddleware');
const {
  createTenant,
  getTenantById,
  getAllTenants,
  updateTenant,
  deleteTenant,
  suspendTenant,
} = require('../controllers/tenantController');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Extract token from Authorization header or cookies
  let token =
    req.headers['authorization'] &&
    req.headers['authorization'].startsWith('Bearer ')
      ? req.headers['authorization'].split(' ')[1]
      : req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded payload to req.user
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT Error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token has expired' });
    }

    res.status(403).json({ message: 'Invalid or malformed token' });
  }
};

router.post('/', validateTenant, auth, checkTenantPlan, createTenant);

router.get('/:id', checkTenantExists, getTenantById);

router.get('/', getAllTenants);

router.put(
  '/:id',
  authenticateTenantOwner,
  checkTenantExists,
  validateTenant,
  checkTenantPlan,
  updateTenant
);

router.delete('/:id', authenticateTenantOwner, checkTenantExists, deleteTenant);

router.patch(
  '/:id/suspend',
  authenticateTenantOwner,
  checkTenantExists,
  suspendTenant
);

module.exports = router;
