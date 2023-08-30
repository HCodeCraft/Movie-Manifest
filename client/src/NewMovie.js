import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import NotAuthorized from "./NotAuthorized";

const NewMovie = () => {
  const { user, loggedIn, addMovie, addReview, errors } =
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (review.watched) {
      const newMovieWithReview = {
        title: movie.title,
        image_url: movie.image_url,
        genres: movie.genres,
        description: movie.description,
        runtime: movie.runtime,
        link: movie.link,
        reviews: [
          {
            reviewtext: review.reviewtext,
            watched: review.watched,
            rating: review.rating,
            user_id: user.id,
            movie_id: null, // Set to null for now because it needs to be created before set
          },
        ],
      };
      const createdMovie = await addMovie(newMovieWithReview);
      newMovieWithReview.reviews[0].movie_id = createdMovie.id;
      await addReview(newMovieWithReview.reviews[0], createdMovie);
    } else {
      const newMovie = {
        title: movie.title,
        image_url: movie.image_url,
        genres: movie.genres,
        description: movie.description,
        runtime: movie.runtime,
        link: movie.link,
      };
      await addMovie(newMovie);
    }
    setMovie({
      title: "",
      image_url: "",
      genres: "",
      description: "",
      runtime: 0,
      link: "",
    });
    setReview({ reviewtext: "", watched: false, rating: null });
    errors.length === 0 ? navigate(`/movies`) : console.log("errors", errors);
  };

  const changeRating = (num) => {
    setReview({ ...review, rating: num });
  };

  return loggedIn ? (
    <div>
      <br />
      <div className="top_banner">
        <h1 className="title">Add a Movie</h1>

        <br />
        <img
          className="newimg"
          src="https://i.pinimg.com/736x/76/5c/1b/765c1b4b1ef541278400a4564d437983--movies-at-nostalgia.jpg"
          alt="a shelf with dvds"
        />
        <br />
        <br />

        <form className="blk newform" onSubmit={handleSubmit}>
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
          <label>Runtime (in minutes): </label>
          <input name="runtime" onChange={handleChange} type="number" /> <br />
          <br />
          <label>Link: </label>
          <input name="link" onChange={handleChange} type="text" /> <br />
          <br />
          <label>Watched: </label>
          <input
            name="watched"
            onChange={handleReviewChange}
            type="checkbox"
          ></input>
          <br />
          <br />
          {review.watched && (
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
              />
              <br />
              <br />
              <label>Rating: </label>
              <StarRating rating={review.rating} changeRating={changeRating} />
            </>
          )}
          {errors.length > 0 ? (
            <h3 className="error">
              Error:{" "}
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </h3>
          ) : null}
          <br />
          <input className="btn" type="submit" />
          <br />
          <br />
        </form>
      </div>
    </div>
  ) : (
    <NotAuthorized />
  );
};

export default NewMovie;
