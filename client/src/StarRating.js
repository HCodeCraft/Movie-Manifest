import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ changeRating, rating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {Array(5)
        .fill()
        .map((stars, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => changeRating(ratingValue)}
              ></input>{" "}
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
    </div>
  );
};

export default StarRating;
