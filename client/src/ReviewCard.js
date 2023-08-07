import React, { useContext } from "react";
import { UserContext } from "./context/user";

const ReviewCard = ({ movie_id }) => {
  const { user, loggedIn, movies } = useContext(UserContext);

  const oneReview = user.reviews.filter(
    (review) => review.movie_id === movie_id
  );

  return (
    <>
    <div className="smallcard">
      <>
        <br />
        <p>My latest rating:</p>
        <p>{oneReview[0] && oneReview[0].stars}</p>
      </>
    </div>
    <br/>
    {/* <br/> */}
    </>
  );
};

export default ReviewCard;
