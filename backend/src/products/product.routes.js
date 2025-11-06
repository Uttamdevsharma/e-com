const express = require('express')
const { createNewProduct, getAllProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct } = require('./product.controller')
const verifyToken = require('../middleware/auth.middleware.js')
const isAdmin = require('../middleware/role.middleware.js')
const router = express.Router()


//create new product (only admin)
router.post('/create-product',createNewProduct)

//get all product
router.get("/",getAllProducts)


//get single Product
router.get('/:id' , getSingleProduct)


//update single product
router.patch('/:id',updateSingleProduct)

//delete single product
router.delete('/:id',deleteSingleProduct)

module.exports =router