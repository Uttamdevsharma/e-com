const express = require('express');
const { userRegistration } = require('./user.controller');
const User = require('./user.model');
const router = express.Router()


//register
router.post('/register',userRegistration);

//login
router.post('/login' , async(req,res) => {
    const {email , password} = req.body

    try{
        const user = await  User.findOne({email})

        if(!user || !(await user.isPasswordMatch(password))){
            return res.status(401).send({
                message : "Incorrect email or password"
            })
        }
    }catch(error){
        res.send({
            error
        })
    }
    
})

module.exports =router