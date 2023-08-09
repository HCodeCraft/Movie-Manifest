import React, { useContext } from "react";
import { UserContext } from "./context/user";

const ReviewCard = ({ movie_id }) => {
  const { user } = useContext(UserContext);

  const oneReview = user.reviews.filter(
    (review) => review.movie_id === movie_id
  );

  return (
    <>
      <div className="smallcard">
        <>
          <br />
          <p className="space">My latest rating:</p>
          <div className="stardiv">
            <p>{oneReview[0] && oneReview[0].stars}</p>
          </div>
        </>
      </div>
      <br />
    </>
  );
};

export default ReviewCard;
