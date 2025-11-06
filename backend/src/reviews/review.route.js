const express = require('express')
const { postReview } = require('./review.controller')

const router =express.Router()


router.post('/post-review', postReview)

module.exports =router