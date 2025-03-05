const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { authenticate, authorizeRole } = require('../middlewares/roleMiddleware');


router.post('/', authenticate, authorizeRole(['admin']), roleController.createRole);


router.get('/', authenticate, authorizeRole(['admin']), roleController.getAllRoles);


router.get('/:id', authenticate, authorizeRole(['admin']), roleController.getRoleById);


router.put('/:id', authenticate, authorizeRole(['admin']), roleController.updateRole);


router.delete('/:id', authenticate, authorizeRole(['admin']), roleController.deleteRole);

module.exports = router;
