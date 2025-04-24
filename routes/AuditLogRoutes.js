const express = require('express');
const router = express.Router();
const { authenticate, authorizeAuditLog } = require('../middleware/middleware');
const { getAllAuditLogs, getAuditLogById, createAuditLog, updateAuditLog, deleteAuditLog } = require('../controllers/AuditLogController');

router.get('/audit-logs', authenticate, authorizeAuditLog, getAllAuditLogs);
router.get('/audit-logs/:id', authenticate, authorizeAuditLog, getAuditLogById);
router.post('/audit-logs', authenticate, authorizeAuditLog, createAuditLog);
router.put('/audit-logs/:id', authenticate, authorizeAuditLog, updateAuditLog);
router.delete('/audit-logs/:id', authenticate, authorizeAuditLog, deleteAuditLog);

module.exports = router;

