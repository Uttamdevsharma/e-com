import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetReviewByUserIdQuery, usePostAReviewMutation } from '../../../redux/features/reviews/reviesApi'

const PostReview = ({ isModalOpen, setIsModalOpen }) => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const user = useSelector((state) => state.auth.user);

  console.log(user?._id)
  const { refetch } = useGetReviewByUserIdQuery(id, { skip: !id });
  const [postAReview] = usePostAReviewMutation();

  const handleClose = () => setIsModalOpen(false);
  const handleRating = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // if (!user?._id) return alert("User not logged in");
    // if (!id) return alert("Product ID not found");
    // if (!comment.trim()) return alert("Comment cannot be empty");
    // if (rating < 1 || rating > 5) return alert("Select a rating between 1-5");
  
    const newUser = {
      comment,
      rating,
      userId: user._id,
      productId: id,
    };
  
    console.log("Submitting review:", newUser); // ✅ check data
  
    try {
      await postAReview(newUser).unwrap();
      alert("Review posted successfully!");
      setComment("");
      setRating(0);
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Post review error:", error); // ✅ full error detail
      alert("Error occurred");
    }
  };
  
  // modal hide condition
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-2">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md z-50">
        <h2 className="text-lg font-bold mb-4">Post a Review</h2>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-2xl"
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
          className="w-full border border-gray-300 p-2 rounded-md mb-4 resize-none"
          placeholder="Write your comment here..."
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
          >
            <i className="ri-close-line"></i> Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
          >
            <i className="ri-check-line"></i> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
