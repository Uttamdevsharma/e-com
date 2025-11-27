const { BASE_URL } = require("../utils/configURL");
const { sendError } = require("../utils/responseHandler");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const PaymentRequest = async(req,res) => {
    const {products,userId} = req.body

    try{
        const line_item = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image]
                },
                unit_amount:Math.round(product.price * 100),

            }
        }))

        const session = await stripe.checkout.sessions.create({
            line_item : line_item,
            payment_method_types : ["card"],
            mode :"payment",
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${BASE_URL}/cancel`,

        })
        

        res.json({id: session.id})
           
        

    }catch(error){
        return sendError(res,500,"Failed to create payment",error)
    }

};

module.exports = {
    PaymentRequest
}