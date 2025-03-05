const express = require('express');
const router = express.Router();
const AuditLogController = require('../controllers/AuditLogController');
const { authenticate, authorizeAuditLog } = require('../middleware/middleware');

router.get('/audit-logs', authenticate, authorizeAuditLog, AuditLogController.getAllAuditLogs);
router.get('/audit-logs/:id', authenticate, authorizeAuditLog, AuditLogController.getAuditLogById);
router.post('/audit-logs', authenticate, authorizeAuditLog, AuditLogController.createAuditLog);
router.put('/audit-logs/:id', authenticate, authorizeAuditLog, AuditLogController.updateAuditLog);
router.delete('/audit-logs/:id', authenticate, authorizeAuditLog, AuditLogController.deleteAuditLog);

module.exports = router;

