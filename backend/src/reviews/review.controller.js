const { sendError, sendSuccess } = require("../utils/responseHandler");
const Review = require("./review.model");
const Product = require("../products/product.model");

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

module.exports = { postReview };
