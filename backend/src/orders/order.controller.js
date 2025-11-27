const { sendError } = require("../utils/responseHandler");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const PaymentRequest = async(req,res) => {
    const {products,userId} = req.body

    try{

        const session = await stripe.checkout.sessions.create({

        })
           
        

    }catch(error){
        return sendError(res,500,"Failed to create payment",error)
    }

};

module.exports = {
    PaymentRequest
}