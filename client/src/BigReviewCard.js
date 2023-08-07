import React, { useContext } from "react";
import { UserContext } from "./context/user";

const BigReviewCard = ({
  text,
  stars,
  username,
  handleFormClick,
  create_date,
  review
}) => {
  const { user, onDeleteReview } = useContext(UserContext);

  console.log("user from BigReviewCard", user)

  const handleDeleteReview = (deletedReview) => {
    fetch(`/reviews/${deletedReview.id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleteReview(review)
    });
  };

  return (
    <div>
      <br/>
    <div className="bigreviews">
  
      {stars}
      <br />
      <br />
      {create_date}
      <br />
      <br />
      {text}
      <br />
      <br/>
    
      {user.username === username ? (
        <>
          <button className="btn" onClick={() => handleFormClick(review)}>
            Edit
          </button>{" "}
          <button className="btn" onClick={() => handleDeleteReview(review)}>Delete</button>
    </>
      ) : (
        <p>-{username}</p>
      )}
    </div>
    </div>
  );
};

export default BigReviewCard;
