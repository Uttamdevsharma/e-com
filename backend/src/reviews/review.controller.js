const { sendError, sendSuccess } = require("../utils/responseHandler");
const Review = require("./review.model");


const postReview = async(req,res) => {

    try{
        const {comment , rating, userId, productId} = req.body;

        if(!comment || rating === undefined || !userId || !productId){
            return sendError(res,400, "Missing Required Fields")
        }

        const existingReview = await Review.findOne({userId,productId})
        if(existingReview){
          
        } else{
            const newReview = new Review({
                comment , 
                rating,
                 userId,
                 productId
            })

            await newReview.save()

            return sendSuccess(res,200,"Review created Successfully")
        }

    }catch(error){
        return sendError(res,500 , "valid post a review")
    }
    
}

module.exports = {
    postReview
}