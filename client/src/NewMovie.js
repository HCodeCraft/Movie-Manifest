import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate, Link } from "react-router-dom";
import StarRating from "./StarRating";

const NewMovie = () => {
  // When a new movie is created I want to have a checkbox that says
  // Unwatched ? Add movie to your list with an empty review
  // maybe have a dropdown to create a review for it at the same time?

  const [movie, setMovie] = useState({
    title: "",
    image_url: "",
    genres: "",
    description: "",
    runtime: 0,
    link: "",
  });

  const [review, setReview] = useState({
    review: "",
    watched: false,
    rating: null
  });

  const [watched, setWatched] = useState(false);

  // If watched is false I want this page to generate a blank review for the user
  // If it is watched I want a dropdown to appear that has them fill out the review info

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  console.log("watched", watched);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title: movie.title,
      image_url: movie.image_url,
      genres: movie.genres,
      description: movie.description,
      runtime: movie.runtime,
      link: movie.link,
    };

    // fetch("/movies", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newCategory),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     onAddCategory(data);
    //     navigate("/categories");
    //   });
  };

  const changeRating = (num) => {
    setReview({ ...review, rating: num });
  };
  

  return (
    <div>
      <br />
      <div>
        <h1>Add a Movie</h1>
      </div>
      <br />
      <img src="https://i.pinimg.com/736x/76/5c/1b/765c1b4b1ef541278400a4564d437983--movies-at-nostalgia.jpg" />
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
          name="link"
          onChange={handleChange}
          type="checkbox"
          onClick={() => setWatched(!watched)}
        />{" "}
        <br />
        <br />
        {watched === true ? (
          <>
            <h2>Add your Review: </h2>
            <label>Review: </label>
            <input name="review" onChange={handleChange} type="text" /> <br />
            <br />
            <label>Rating: </label>
            <StarRating rating={review.rating} changeRating={changeRating}/>
          </>
        ) : null}
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewMovie;
