const { sendError, sendSuccess } = require("../utils/responseHandler");
const Review = require("./review.model");
const Product = require("../products/product.model");


//post a review and convert average rating For this product
const postReview = async (req, res) => {
  try {
    const { comment, rating, userId, productId } = req.body;

    if (!comment || rating === undefined || !userId || !productId) {
      return sendError(res, 400, "Missing Required Fields");
    }

    // 1️⃣ Create or update review
    const existingReview = await Review.findOne({ userId, productId });

    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      const newReview = new Review({
        comment,
        rating,
        userId,
        productId,
      });
      await newReview.save();
    }

    // 2️⃣ Calculate new average rating
    const reviews = await Review.find({ productId });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      // 3️⃣ Update product rating
      const product = await Product.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      }
    }

    // 4️⃣ Final success response
    return sendSuccess(res, 200, "Review posted and product rating updated");

  } catch (error) {
    console.log(error);
    return sendError(res, 500, "Something went wrong while posting review");
  }
};

const  getTotalReviewsCount = async(req,res) => {
    try{
        const total = await Review.countDocuments({})
        return sendSuccess(res,200,"Total Reviews count Successfully" , {total})

    }catch(error){
        return sendError(res,500,"no revies Fetched successfully")
    }
}
//user get their reviews
const getUserReviews = async (req, res) => {
    const userId = req.params.id; // ✅ fix
  
    try {
      const reviews = await Review.find({ userId }).sort({createdAt : -1}) 
      if (!reviews || reviews.length === 0) {
        return sendError(res, 404, "Reviews not found");
      }
  
      const countReviews = await Review.countDocuments({ userId });
  
      return sendSuccess(res, 200, "Successfully fetched reviews", {
        reviews,
        countReviews
      });
    } catch (error) {
      console.log(error); // ✅ see actual error
      return sendError(res, 500, "Failed to fetch reviews");
    }
  };
  
module.exports = {
     postReview,
     getUserReviews,
     getTotalReviewsCount

};
