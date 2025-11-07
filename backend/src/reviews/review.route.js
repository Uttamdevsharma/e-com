const express = require('express')
const { postReview, getUserReviews, getTotalReviewsCount } = require('./review.controller')

const router =express.Router()

//post a review
router.post('/post-review', postReview)

//get Reviewscount
router.get('/total-reviews' , getTotalReviewsCount)

//user get their reviews and count
router.get('/user/:id' , getUserReviews)

module.exports =router