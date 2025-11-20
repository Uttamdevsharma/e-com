import React, { useState } from "react";
import StarRating from "../../../components/StarRating";
import commentorImage from "../../../assets/avatar.png";
import PostReview from "./PostReview";

const ReviewsCard = ({ productReviews }) => {
  const reviews = productReviews || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="my-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold tracking-tight">
          {reviews.length > 0 ? "Customer Reviews" : "No Reviews Yet"}
        </h3>
        <button
          onClick={handleModal}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <i className="ri-pencil-line"></i> Add Review
        </button>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={commentorImage}
                  alt="Reviewer"
                  className="h-12 w-12 rounded-full border shadow-sm"
                />
                <div className="space-y-0.5">
                  <p className="font-medium text-gray-800 text-base capitalize">
                    {review?.userId?.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(review?.createdAt).toLocaleDateString()}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed md:w-4/5">
                {review?.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">Be the first to leave a review!</p>
      )}

      {/* Modal Component */}
      <PostReview isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default ReviewsCard;
