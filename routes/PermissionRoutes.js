const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/PermissionController');
const { authenticate, authorizePermission } = require('../middleware/authMiddleware');


router.post('/', authenticate, authorizePermission(['admin']), PermissionController.createPermission);


router.get('/', authenticate, authorizePermission(['admin']), PermissionController.getPermissions);


router.get('/:permissionId', authenticate, authorizePermission(['admin']), PermissionController.getPermissionById);

router.put('/:permissionId', authenticate, authorizePermission(['admin']), PermissionController.updatePermission);

router.delete('/:permissionId', authenticate, authorizePermission(['admin']), PermissionController.deletePermission);

module.exports = router;
