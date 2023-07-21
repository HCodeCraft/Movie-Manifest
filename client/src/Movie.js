import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loggedIn, movies, onDeleteMovie, editReview } =
    useContext(UserContext);

  const [reviewForm, setReviewForm] = useState(false);

  const [movie, setMovie] = useState({
    title: "",
    image_url: "",
    genres: "",
    description: "",
    runtime: "",
    hours_and_min: "",
    link: "",
    created_at: "",
  });

  const [review, setReview] = useState({
    review: ,
    watched: false,
    rating: 0,
  });

  const handleReviewChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setReview({
      ...review,
      [e.target.name]: value,
    });
  };

  const changeRating = (num) => {
    setReview({ ...review, rating: num });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editReview({
      review: review.textarea,
      watched: true,
      rating: review.rating,
    });
  };

  const handleDeleteMovie = () => {
    fetch(`/movies/${params.id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleteMovie(movie);
      navigate(`/movies`);
    });
  };

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.id == params.id);

    if (selectedMovie) {
      const myReview = user.reviews.find(
        (r) => r.movie_id === selectedMovie.id
      );
      myReview && setReview(myReview);

      setMovie(selectedMovie);
    }
  }, [movies]);

  return loggedIn ? (
    <div className="top_banner">
      <h1>{movie.title}</h1>
      <br />
      <img className="desimage" src={movie.image_url} />
      <br />
      <h3> {movie.genres}</h3>
      <br />
      <h4>
        Runtime: {movie.runtime} mins ({movie.hours_and_min})
      </h4>
      <br />
      <div className="desdiv">
        <p>{movie.description}</p>
        <br />
        <br />
        <button onClick={() => handleDeleteMovie(params.id)}>
          Delete Movie
        </button>
        <br />
        <br />
        <div>
          {review.watched ? (
            <>
              {" "}
              <h2>My Review</h2> <br />
              {review.stars}
              <br />
              <br />
              {review.reviewtext}
              <br />
              <br />
            </>
          ) : reviewForm === false ? (
            <>
              <h3>Unwatched</h3> <br />{" "}
              <button onClick={() => setReviewForm(true)}>Add Review</button>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
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
                <StarRating
                  rating={review.rating}
                  changeRating={changeRating}
                />
                <br />
                <input type="submit" />
                <br />
                <br />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <br />
      <h1>You're not authorized, please log in or create an account</h1>
    </>
  );
};

export default Movie;
