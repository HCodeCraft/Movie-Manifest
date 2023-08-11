import React, { useContext } from "react";
import { UserContext } from "./context/user";

const ReviewCard = ({ movie_id }) => {
  const { user } = useContext(UserContext);

  const oneReview = user.reviews.filter(
    (review) => review.movie_id === movie_id
  );

  const lastReviewIndex = oneReview.length - 1;

  return (
    <>
      <div className="smallcard">
        <>
          <br />
          <p className="space">My latest rating:</p>
          <div className="stardiv">
            <p>
              {oneReview[lastReviewIndex] && oneReview[lastReviewIndex].stars}
            </p>
          </div>
        </>
      </div>
      <br />
    </>
  );
};

export default ReviewCard;
