const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/create', userController.createUser);
router.get('/get', userController.getUserById);
router.get('/getUsers', userController.getUsers);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteuser', userController.deleteUser);



