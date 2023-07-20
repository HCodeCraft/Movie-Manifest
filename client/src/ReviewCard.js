import React, { useContext } from "react";
import { UserContext } from "./context/user";

const ReviewCard = ({ movie_id }) => {
  const { user, loggedIn, movies } = useContext(UserContext);

  const oneReview = user.reviews.filter(
    (review) => review.movie_id === movie_id
  );

  console.log("oneReview", oneReview);

  return (
    <div>
      {" "}
      {oneReview[0].rating < 1 ? (
        <h3>Unwatched</h3>
      ) : (
        <>
          {" "}
          <p>{oneReview[0].stars}</p>
          <p>-{oneReview[0].username}</p>{" "}
        </>
      )}
    </div>
  );
};

export default ReviewCard;
