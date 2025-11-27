const express = require('express')
const { PaymentRequest } = require('./order.controller')
const router = express.Router()


//create checkout session
router.post('/create-checkout-session',PaymentRequest)
module.exports =router