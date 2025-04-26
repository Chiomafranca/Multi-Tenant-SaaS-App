const express = require('express');
const router = express.Router();
const { authenticate, authorizeAuditLog } = require('../middlewares/AuditLogMiddleware');
const { getAllAuditLogs, getAuditLogById, createAuditLog, updateAuditLog, deleteAuditLog } = require('../controllers/AuditLogController');

router.get('/', authenticate, authorizeAuditLog, getAllAuditLogs);
router.get('/:id', authenticate, authorizeAuditLog, getAuditLogById);
router.post('/', authenticate, authorizeAuditLog, createAuditLog);
router.put('/:id', authenticate, authorizeAuditLog, updateAuditLog);
router.delete('/:id', authenticate, authorizeAuditLog, deleteAuditLog);

module.exports = router;

