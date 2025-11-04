const express = require('express');
const { userRegistration } = require('./user.controller');
const router = express.Router()


//register
router.post('/register',userRegistration);
//login
router.login('/login' , async(req,res) => {
    
})

module.exports =router