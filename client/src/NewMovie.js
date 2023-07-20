import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import { useNavigate, Link } from "react-router-dom";
import StarRating from "./StarRating";

const NewMovie = () => {
  // When a new movie is created I want to have a checkbox that says
  // Unwatched ? Add movie to your list with an empty review
  // maybe have a dropdown to create a review for it at the same time?

  const { user, loggedIn, movies, addMovie, addReview } =
    useContext(UserContext);

  const [movie, setMovie] = useState({
    title: "",
    image_url: "",
    genres: "",
    description: "",
    runtime: 0,
    link: "",
  });

  const [review, setReview] = useState({
    reviewtext: "",
    watched: false,
    rating: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setReview({
      ...review,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMovie({
      title: movie.title,
      image_url: movie.image_url,
      genres: movie.genres,
      description: movie.description,
      runtime: movie.runtime,
      link: movie.link,
    });

    // addReview({
    //   reviewtext: review.reviewtext,
    //   watched: review.watched,
    //   rating: review.rating,
    // });
  };

  const changeRating = (num) => {
    setReview({ ...review, rating: num });
  };

  return loggedIn ? (
    <div>
      <br />
      <div className="top_banner">
        <h1>Add a Movie</h1>

        <br />
        <img
          className="newimg"
          src="https://i.pinimg.com/736x/76/5c/1b/765c1b4b1ef541278400a4564d437983--movies-at-nostalgia.jpg"
        />
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <label>Movie Title: </label>
          <input name="title" onChange={handleChange} type="text" /> <br />
          <br />
          <label>Image url: </label>
          <input name="image_url" onChange={handleChange} type="text" /> <br />
          <br />
          <label>Genres: </label>
          <input name="genres" onChange={handleChange} type="text" /> <br />
          <br />
          <label>Description: </label>
          <textarea
            rows={5}
            cols={20}
            name="description"
            onChange={handleChange}
            type="text"
          />{" "}
          <br />
          <br />
          {/* Change to textbox ^ */}
          <label>Runtime (in minutes): </label>
          <input name="runtime" onChange={handleChange} type="text" /> <br />
          <br />
          <label>Link: </label>
          <input name="link" onChange={handleChange} type="text" /> <br />
          <br />
          <label>Watched: </label>
          <input
            name="watched"
            onChange={handleReviewChange}
            type="checkbox"
            onClick={handleReviewChange}
          />{" "}
          <br />
          <br />
          {review.watched === true ? (
            <>
              <h2>Add your Review: </h2>
              <br />
              <label>Review: </label>
              <textarea
                rows={5}
                cols={20}
                name="reviewtext"
                onChange={handleReviewChange}
                type="text"
              />{" "}
              <br />
              <br />
              <label>Rating: </label>
              <StarRating rating={review.rating} changeRating={changeRating} />
            </>
          ) : null}
          <br />
          <input type="submit" />
          <br />
          <br />
        </form>
      </div>
    </div>
  ) :  <><br/><h1>You're not authorized, please log in or create an account</h1></>
};

export default NewMovie;
