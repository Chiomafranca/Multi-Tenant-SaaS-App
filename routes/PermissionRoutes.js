const express = require('express');
const router = express.Router();
const { auth, authorizePermission } = require('../middlewares/PermissionMiddleware');
const { createPermission, getPermissions, getPermissionById, updatePermission, deletePermission } = require('../controllers/PermissionControll');


router.post('/', auth, authorizePermission(['admin']), createPermission);


router.get('/', auth, authorizePermission(['admin']), getPermissions);


router.get('/:permissionId', auth, authorizePermission(['admin']), getPermissionById);

router.put('/:permissionId', auth, authorizePermission(['admin']), updatePermission);

router.delete('/:permissionId', auth, authorizePermission(['admin']), deletePermission);

module.exports = router;
