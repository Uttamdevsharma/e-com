// components/StarRating.jsx
import React from "react";

const StarRating = ({ rating = 0, maxStars = 5 }) => {
  // Create an array of length maxStars
  const stars = Array.from({ length: maxStars }, (_, i) => i);

  return (
    <div className="flex items-center gap-1">
      {stars.map((_, i) => {
        // Fill star if i < floor(rating)
        const fill = i < Math.floor(rating);
        // Half star if rating has 0.5
        const half = rating - i >= 0.5 && rating - i < 1;

        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={fill ? "gold" : half ? "url(#half)" : "none"}
            stroke="gold"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="gold" />
                <stop offset="50%" stopColor="white" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      })}
      <span className="ml-2 text-gray-600 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
