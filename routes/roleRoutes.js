const express = require('express');
const router = express.Router();
const { auth, authorizeRole } = require('../middlewares/roleMiddleware');
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/roleController');


router.post('/', auth, authorizeRole(['admin']), createRole);


router.get('/', auth, authorizeRole(['admin']), getAllRoles);


router.get('/:id', auth, authorizeRole(['admin']), getRoleById);


router.put('/:id', auth, authorizeRole(['admin']), updateRole);


router.delete('/:id', auth, authorizeRole(['admin']), deleteRole);

module.exports = router;
