const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware'); 
const authenticate = require('../middlewares/authMiddleware'); 
const {
  createAPIKey,
  deleteAPIKey,
  updateAPIKey,
  getAllAPIKeys,
  getAPIKeyById
} = require('../controllers/ApiKeyController');

router.post('/', authenticate, createAPIKey);
router.get('/', authenticate, apiKeyMiddleware, getAllAPIKeys);
router.get('/:id', authenticate,  getAPIKeyById);
router.put('/:id', authenticate, apiKeyMiddleware, updateAPIKey); 
router.delete('/:id', authenticate,  deleteAPIKey);

module.exports = router;
