import React, { useState } from "react";
import StarRating from "../../../components/StarRating";
import commentorImage from "../../../assets/avatar.png";
import PostReview from "./PostReview";

const ReviewsCard = ({ productReviews }) => {
  const reviews = productReviews || [];


  const [isModalOpen , setIsModalOpen] = useState(false)

  const handleModal = () => {
     setIsModalOpen(true)
  }

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
        <button onClick={handleModal} className="px-6 py-3 bg-blue-600 text-white rounded-md flex items-center gap-2">
          <i className="ri-pencil-line mr-2"></i> Add A Comment
        </button>
      </div>

      {/* PostAReview Modal */}
      <PostReview isModalOpen={isModalOpen } setIsModalOpen={setIsModalOpen}/>
      
     
    </div>
  );
};

export default ReviewsCard;
