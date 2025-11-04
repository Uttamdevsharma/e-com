const jwt = require ('jsonwebtoken')
const moment = require('moment')


const genrateToken = (
    userId,
    role,
    expires ,
    type,
    secret = process.env.JWT_SECRET
) => {

    const payload = {
        sub : userId,
        role,
        iat : moment().unix(),
        exp : expires.unix(),
        type
    }
    return jwt.sign(payload,secret)

}

module.exports = {
    genrateToken
}