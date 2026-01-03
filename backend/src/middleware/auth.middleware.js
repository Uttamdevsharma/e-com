const jwt = require('jsonwebtoken')
const { sendError, sendSuccess } = require('../utils/responseHandler')


const verifyToken = (req,res,next) => {
    
    try{
        // const token = req.headers.authorization?.split(' ')[1]
        const token = req.cookies.accessToken
        console.log("Token IS",token)

        if(!token){
            return sendError(res, 401, "No token provided");

        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded
        next()

    }catch(error){
       return sendError(res,401,"Invalid Token", response)
    }
}
module.exports = verifyToken