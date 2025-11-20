const { sendError, sendSuccess } = require("../utils/responseHandler");
const Review = require("./review.model");
const Product = require("../products/product.model");


//post a review and convert average rating For this product
const postReview = async (req, res) => {
  try {
    const { comment, rating, userId, productId } = req.body;

    // ✅ Validate required fields
    if (!comment || rating === undefined || rating < 1 || rating > 5 || !userId || !productId) {
      return res.status(400).json({ success: false, message: "Missing or invalid required fields" });
    }

    // 1️⃣ Check if review exists → update or create
    const existingReview = await Review.findOne({ userId, productId });

    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      await Review.create({ comment, rating, userId, productId });
    }

    // 2️⃣ Calculate & update average rating
    const reviews = await Review.find({ productId });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      await Product.findByIdAndUpdate(
        productId,
        { rating: averageRating },
        { validateBeforeSave: false }
      );
    }

    // 3️⃣ Fetch reviews with user data populated
    const populatedReviews = await Review.find({ productId }).populate("userId", "username email");

    // 4️⃣ Return success
    return res.status(200).json({
      success: true,
      message: "Review posted & reviews fetched successfully",
      reviews: populatedReviews,
    });

  } catch (error) {
    console.error("Error in postReview:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while posting review",
    });
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
