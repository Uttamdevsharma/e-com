const express = require('express')
const { PaymentRequest, confirmPayment, getOrdersByEmail, getOrdersByOrderId, getAllOrders, updateOrderStatus} = require('./order.controller')
const verifyToken = require('../middleware/auth.middleware')
const isAdmin = require('../middleware/role.middleware')
const router = express.Router()


//create checkout session
router.post('/create-checkout-session',PaymentRequest)

//confirm payment 
router.post("/confirm-payment",confirmPayment)


//get order by email address
router.get('/:email',getOrdersByEmail)


//get orders by orderId
router.get('/order/:id',getOrdersByOrderId)


//get all orders
router.get('/',getAllOrders)


//update order status(admin)
router.patch('/update-status/:id',updateOrderStatus)


module.exports =router
