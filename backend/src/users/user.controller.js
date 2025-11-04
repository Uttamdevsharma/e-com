const User = require("./user.model");
const moment = require('moment')



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
                username: user.name,
                email : user.email
            }

        })

    }catch(error){
        res.status(500).send({
            message : "Registration Failed"
        })
    }
}

const userLogin =  async(req,res) => {
    const {email , password} = req.body

    try{
        const user = await  User.findOne({email})

        if(!user || !(await user.isPasswordMatch(password))){
            return res.status(401).send({
                message : "Incorrect email or password"
            })
        }

        const accessTokeExpires = moment.add(process.env.JWT_ACCESS_EXPIRATION_MINUTES,
            'minute'
        )

        const accesToken = await genrateToken(user._id,
            user.role,
            accessTokeExpires,
            "access"
        )


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