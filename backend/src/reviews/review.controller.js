const { sendError, sendSuccess } = require("../utils/responseHandler");
const Review = require("./review.model");

const postReview = async (req, res) => {
  try {
    const { comment, rating, userId, productId } = req.body;

    if (!comment || rating === undefined || !userId || !productId) {
      return sendError(res, 400, "Missing Required Fields");
    }

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

      return sendSuccess(res, 200, "Review created Successfully");
    }

    const reviews = await Review.find({ productId });

    if (reviews.length > 0) {
      // Calculate average rating
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      // Find the product and update its rating
      const product = await Products.findById(productId);

      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });

        return successResponse(res, 200, "Review posted successfully");
      } else {
        return errorResponse(res, 404, "Product not found");
      }
    } else {
      return errorResponse(res, 400, "No reviews to post");
    }
  } catch (error) {
    return sendError(res, 500, "valid post a review");
  }
};

module.exports = {
  postReview,
};
