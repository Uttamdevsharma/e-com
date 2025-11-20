import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostAReviewMutation } from "../../../redux/features/reviews/reviesApi";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import toast from "react-hot-toast";

const PostReview = ({ isModalOpen, setIsModalOpen }) => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const user = useSelector((state) => state.auth.user);
  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postAReview] = usePostAReviewMutation();

  const handleClose = () => setIsModalOpen(false);
  const handleRating = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) return toast.error("Please login to submit a review");
    if (!comment.trim()) return toast.error("Comment is required");
    if (rating < 1) return toast.error("Please select a rating");

    const reviewData = {
      comment: comment.trim(),
      rating,
      userId: user._id,
      productId: id,
    };

    try {
      await postAReview(reviewData).unwrap();
      toast.success("Review posted successfully!");
      setComment("");
      setRating(0);
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Error occurred while posting review");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 md:p-8 relative transition-all duration-300">
        
        {/* Close Modal Button (Top Right) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center tracking-tight">
          Post a Review
        </h2>

        {/* Star Rating */}
        <div className="flex items-center justify-center space-x-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={`cursor-pointer text-3xl transition-all 
                ${
                  rating >= star
                    ? "text-yellow-500"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>

        {/* Comment Textarea */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Write your comment..."
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg mb-6 resize-none transition outline-none text-sm"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg text-gray-600 transition flex items-center gap-2"
          >
            <i className="ri-close-line"></i> Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
          >
            <i className="ri-check-line"></i> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
