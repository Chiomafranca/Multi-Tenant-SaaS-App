const express = require('express');
const { createUser, getUserById, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router()


router.post('/create', createUser);
router.get('/get', getUserById);
router.get('/getUsers', getUsers);
router.put('/updateUser', updateUser);
router.delete('/deleteuser', deleteUser);



