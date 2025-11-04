const express = require('express');
const User = require('./user.model');
const router = express.Router()


//register
router.post('/register',async(req,res) => {
    const {username,email,password} = req.body

    try {

       

        const user = new User({
            username,
            email,
            password
        })

        await user.save();

        res.status(200).send({
            message : "User Registered Succesfully",
            data : {
                id: user._id,
                username: user.name,
                email : user.email
            }

        })

    }catch(error){
        res.status(500).send({
            message : "Registration Failed"
        })
    }
})