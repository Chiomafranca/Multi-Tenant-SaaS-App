const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/roleMiddleware');
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/roleController');


router.post('/', authenticate, authorizeRole(['admin']), createRole);


router.get('/', authenticate, authorizeRole(['admin']), getAllRoles);


router.get('/:id', authenticate, authorizeRole(['admin']), getRoleById);


router.put('/:id', authenticate, authorizeRole(['admin']), updateRole);


router.delete('/:id', authenticate, authorizeRole(['admin']), deleteRole);

module.exports = router;
