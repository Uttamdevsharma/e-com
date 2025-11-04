const express = require('express');
const { userRegistration, userLogin } = require('./user.controller');
const router = express.Router()



//register
router.post('/register',userRegistration);

//login
router.post('/login' ,userLogin)

module.exports =router