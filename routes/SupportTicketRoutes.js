const express = require('express');
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const { applyRateLimiting } = require('../middlewares/rateLimiter');
const { logRequests } = require('../middlewares/logger');
const { authorizePermission } = require('../middlewares/PermissionMiddleware');
const { checkTenantExists, validateTenant, checkTenantPlan, authenticateTenantOwner } = require('../middlewares/tenantMiddleware');
const { validateSupportTicket } = require('../middlewares/validateSupportTicket');
const { 
  getAllTickets, 
  createTicket, 
  getTicketById, 
  updateTicket, 
  deleteTicket 
} = require('../controllers/SupportTicketController');

// Apply logger, rate limiting, and authentication middleware globally to all support routes
router.use(logRequests, applyRateLimiting, auth);

// Route to create a support ticket (validate ticket data and authenticate tenant owner)
router.post('/support-ticket', validateSupportTicket, authenticateTenantOwner, validateTenant, checkTenantPlan, createTicket);

// Route to get a support ticket by tenant ID (check tenant existence)
router.get('/support-tickets/:tenantId', checkTenantExists, getTicketById);

// Route to get all support tickets (can be authorized based on permissions, if needed)
router.get('/supports', authorizePermission(['admin', 'support']), getAllTickets);

// Route to update a support ticket (validate ticket data, check tenant existence, and authenticate tenant owner)
router.put('/support-ticket/:id', validateSupportTicket, checkTenantExists, authenticateTenantOwner, validateTenant, checkTenantPlan, updateTicket);

// Route to delete a support ticket (check tenant existence and authenticate tenant owner)
router.delete('/support-ticket/:id', checkTenantExists, authenticateTenantOwner, deleteTicket);

module.exports = router;
