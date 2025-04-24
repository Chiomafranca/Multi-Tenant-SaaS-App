const express = require('express');
const router = express.Router();
const { authenticate, authorizePermission } = require('../middleware/authMiddleware');
const { createPermission, getPermissions, getPermissionById, updatePermission, deletePermission } = require('../controllers/PermissionControll');


router.post('/', authenticate, authorizePermission(['admin']), createPermission);


router.get('/', authenticate, authorizePermission(['admin']), getPermissions);


router.get('/:permissionId', authenticate, authorizePermission(['admin']), getPermissionById);

router.put('/:permissionId', authenticate, authorizePermission(['admin']), updatePermission);

router.delete('/:permissionId', authenticate, authorizePermission(['admin']), deletePermission);

module.exports = router;
