import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate, Link } from "react-router-dom";

const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, loggedIn, movies, onDeleteMovie, onEditReview } =
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
    reviewtext: "",
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



  const handleEditSubmit = (e) => {
    e.preventDefault();
    const editedReview = {
      reviewtext: review.reviewtext,
      watched: true,
      rating: review.rating,
    };

    fetch(`/reviews/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        onEditReview(data);
        console.log("It was edited!");
        console.log("Here's the data", data);
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
  }, [movies, params.id, user.reviews]);

  const handleFormClick = () => {
    setReviewForm(true);
  };

  return loggedIn ? (
    <>
      <div className="top_banner">
        <h1>{movie.title}</h1>
        <br />
        <img className="desimage" src={movie.image_url} alt={movie.title} />
        <br />
        <h3>{movie.genres}</h3>
        <br />
        <h4>
          Runtime: {movie.runtime} mins ({movie.hours_and_min})
        </h4>
        <br />
        <div className="desdiv">
          <p>{movie.description}</p>
          <br />
          <br />
          <Link to={`edit`}>
            <button>Edit Movie</button>
          </Link>

          <button onClick={() => handleDeleteMovie(params.id)}>
            Delete Movie
          </button>
          <br />
          <br />
          <div>
            {review.watched && reviewForm === false ? (
              <>
                <h2>My Review</h2>
                <br />
                {review.stars}
                <br />
                <br />
                {review.reviewtext}
                <br />
                <br />
                <button onClick={handleFormClick}>Edit your Review</button>
                <br />
                <br />
              </>
            ) : (
              <>
                <br />
                <button onClick={handleFormClick}>Add Review</button>
                <br />
                <br />
              </>
            )}
            {reviewForm && (
              <>
                <form onSubmit={handleEditSubmit}>
                  <h2>{review.watched ? "Edit" : "Add"} your Review: </h2>
                  <br />
                  <label>Review: </label>
                  <textarea
                    rows={5}
                    cols={20}
                    name="reviewtext"
                    value={review.reviewtext}
                    onChange={handleReviewChange}
                    type="text"
                  />
                  <br />
                  <br />
                  <label>Rating: </label>
                  {/* Your StarRating component should go here */}
                  {/* <StarRating rating={review.rating} changeRating={changeRating} /> */}
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
    </>
  ) : (
    <>
      <br />
      <h1>You're not authorized, please log in or create an account</h1>
    </>
  );
};

export default Movie;
