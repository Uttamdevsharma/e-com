const express = require('express');
const { userRegistration, userLogin, userLogout, getAllUsers } = require('./user.controller');
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

module.exports =router