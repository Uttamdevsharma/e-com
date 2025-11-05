const express = require('express');
const { userRegistration, userLogin, userLogout, getAllUsers, deleteUser, userUpdate } = require('./user.controller');
const verifyToken = require('../middleware/auth.middleware.js');
const isAdmin = require('../middleware/role.middleware.js');
const router = express.Router()



//register
router.post('/register',userRegistration);

//login
router.post('/login' ,userLogin)


//logout
router.post('/logout' , userLogout)

//get all user
router.get('/users', verifyToken, isAdmin,getAllUsers)


//delete a product
router.delete('/users/:id' ,verifyToken, isAdmin, deleteUser)


//update user (by admin)
router.put('/users/:id' ,verifyToken, isAdmin, userUpdate)

module.exports =router