import React from "react";
import StarRating from "../../../components/StarRating";
import commentorImage from "../../../assets/avatar.png";

const ReviewsCard = ({ productReviews }) => {
  const reviews = productReviews || [];
  console.log("🔍 Reviews Data:", reviews);

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments...</h3>
            <div>
              {reviews.map((review, index) => (
                <div key={index} className="mt-4">
                  <div className="flex gap-4 items-center">
                    <img src={commentorImage} alt="" className="h-14 w-14" />
                    <div className="space-y-1">
                      <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                        {review?.userId?.username}
                      </p>
                      <p className="text-[12px] italic">
                        {new Date(review?.createdAt).toLocaleDateString()}
                      </p>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>

                  {/* Comment details */}
                  <div className="text-gray-600 mt-5 border p-8">
                    <p className="md:w-4/5">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Add comment section */}
      <div className="mt-12">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md flex items-center gap-2">
          <i className="ri-pencil-line mr-2"></i> Add A Comment
        </button>
      </div>

      {/* PostAReview Modal */}
      {/* <div
        className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2`}
      >
        <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
          <h2 className="text-lg font-bold mb-4">Post a Review</h2>

          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="cursor-pointer text-yellow-500 text-xl"
              >
                {rating >= star ? (
                  <i className="ri-star-fill"></i>
                ) : (
                  <i className="ri-star-line"></i>
                )}
              </span>
            ))}
          </div>

          <textarea
            rows="4"
            className="w-full border border-gray-300 p-2 rounded-md mb-4"
            placeholder="Write your comment here..."
          />

          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2">
              <i className="ri-close-line"></i> Cancel
            </button>
            <button
        
              className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2"
            >
              <i className="ri-check-line"></i> Submit
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ReviewsCard;
