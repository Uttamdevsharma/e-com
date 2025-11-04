const { generateToken } = require("../service/token.service");
const User = require("./user.model");
const moment = require('moment')


//register
const userRegistration = async(req,res) => {
    const {username,email,password} = req.body

    try {

        if(await User.isEmailTaken(email)){
            return res.status(400).send({
                message : "Email Already Taken"
            })
        }

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
                username: user.username,
                email : user.email
            }

        })

    }catch(error){
        res.status(500).send({
            message : "Registration Failed"
        })
    }
}

//login
const userLogin =  async(req,res) => {
    const {email , password} = req.body

    try{
        const user = await  User.findOne({email})

        if(!user || !(await user.isPasswordMatch(password))){
            return res.status(401).send({
                message : "Incorrect email or password"
            })
        }

        const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES,
            'minute'
        )

        const accessToken = await generateToken(user._id,
            user.role,
            accessTokenExpires,
            "access"
        )

        res.status(200).send({
            message : "Logged in successfully",
            accessToken,
            user: {
                _id : user._id,
                username : user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession : user.profession
            }
        })


    }catch(error){
        res.send({
            error
        })
    }
    
}

module.exports = {
    userRegistration,
    userLogin
}