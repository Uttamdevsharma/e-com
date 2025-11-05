const express = require('express');
const { userRegistration, userLogin, userLogout, getAllUsers } = require('./user.controller');
const router = express.Router()



//register
router.post('/register',userRegistration);

//login
router.post('/login' ,userLogin)


//logout
router.post('/logout' , userLogout)

//get all user
router.get('/users', getAllUsers)

module.exports =router