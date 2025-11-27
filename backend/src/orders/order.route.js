const express = require('express')
const router = express.Router()


//create checkout session
router.post('/create-checkout-session',PaymentRequest)