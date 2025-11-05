const { sendError } = require("../utils/responseHandler")

const isAdmin = (req,res,next) => {
    if(req.user.role !== "admin"){
        return sendError(res,401 , "Unauthorized access")
    }
    next()
}

module.exports = isAdmin