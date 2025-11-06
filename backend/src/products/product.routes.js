const express = require('express')
const { createNewProduct, getAllProducts } = require('./product.controller')
const verifyToken = require('../middleware/auth.middleware.js')
const isAdmin = require('../middleware/role.middleware.js')
const router = express.Router()


//create new product (only admin)
router.post('/create-product',createNewProduct)

//get all product
router.get("/",getAllProducts)

module.exports =router