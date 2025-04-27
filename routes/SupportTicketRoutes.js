const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { logRequests } = require('../middlewares/logger');
const { authorizePermission } = require('../middlewares/PermissionMiddleware');
const {
  validateSupportTicket,
} = require('../middlewares/validateSupportTicket');
const { authenticateTenantOwner } = require('../middlewares/tenantMiddleware');
const {
  getAllTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require('../controllers/SupportTicketController');

router.use(logRequests, auth);

// Create a ticket for a tenant
router.post(
  '/:tenantId/tickets',
  authenticateTenantOwner,
  validateSupportTicket,
  createTicket
);

// Get all tickets for a tenant
router.get(
  '/tickets',
  // authenticateTenantOwner,
  authorizePermission(['admin', 'support']),
  getAllTickets
);

// Get a specific ticket for a tenant
router.get('/tickets/:id', getTicketById);

// Update a specific ticket for a tenant
router.put('/tickets/:id', updateTicket);

// Delete a specific ticket for a tenant
router.delete('/:tenantId/tickets/:id', authenticateTenantOwner, deleteTicket);

module.exports = router;
