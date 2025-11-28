const express = require('express')
const { PaymentRequest, confirmPayment } = require('./order.controller')
const router = express.Router()


//create checkout session
router.post('/create-checkout-session',PaymentRequest)

//confirm payment 
router.post("/confirm-payment",confirmPayment)



module.exports =router
