import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate, Link, NavLink } from "react-router-dom";
import StarRating from "./StarRating";
import BigReviewCard from "./BigReviewCard";
import NotAuthorized from "./NotAuthorized";

const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, loggedIn, movies, onDeleteMovie, onEditReview, addReview } =
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
    reviews: [],
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

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      reviewtext: review.reviewtext,
      watched: true,
      rating: review.rating,
      movie_id: params.id,
    };

    addReview(newReview);

    setReviewForm(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const editedReview = {
      reviewtext: review.reviewtext,
      watched: true,
      rating: review.rating,
      movie_id: params.id,
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
        setReviewForm(false);
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
      const myReview =
        user.reviews &&
        user.reviews.find((r) => r.movie_id === selectedMovie.id);

      myReview && setReview(myReview);

      setMovie(selectedMovie);
    }
  }, [movies, params.id, user.reviews]);

  const handleFormClick = (selectedReview) => {
    setReviewForm(true);
    setReview(selectedReview);
  };

  const reviewList = movie.reviews.map((review) => (
    <BigReviewCard
      key={review.id}
      review={review}
      text={review.reviewtext}
      stars={review.stars}
      username={review.username}
      created_at={review.created_at}
      id={review.id}
      create_date={review.create_date}
      handleFormClick={handleFormClick}
    />
  ));

  return loggedIn === true ? (
    <>
      <div className="top_banner">
        <h1 className="title">{movie.title}</h1>
        <br />
        <img className="desimage" src={movie.image_url} alt={movie.title} />
        <br />
        <h3 className="blk">{movie.genres}</h3>
        <br />
        <h4 className="blk">
          Runtime: {movie.runtime} mins{" "}
          {movie.runtime > 59 ? `(${movie.hours_and_min})` : null}
        </h4>
        <br />
        <div className="desdiv">
          <p className="blk">{movie.description}</p>
          <br />
          <br />
          <NavLink to={movie.link}>
            <button className="btn">Link</button>
          </NavLink>
          <br />
          <br />
          <Link to={`edit`}>
            <button className="btn btn-primary space">Edit Movie</button>
          </Link>

          <button
            className="btn btn-primary space"
            onClick={() => handleDeleteMovie()}
          >
            Delete Movie
          </button>
          <br />
          <br />
          {reviewForm === false ? (
            <button className="btn btn-accent" onClick={handleFormClick}>
              Add Review
            </button>
          ) : null}

          <div>
            {!reviewForm && (
              <>
                {reviewList}
                <br />
                <br />
              </>
            )}
            {reviewForm && (
              <>
                <form
                  onSubmit={
                    review.watched ? handleEditSubmit : handleAddReviewSubmit
                  }
                >
                  <br />
                  <br />
                  <label className="toplabel">Review: </label>
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
                  <StarRating
                    rating={review.rating}
                    changeRating={changeRating}
                  />
                  <br />
                  <input className="btn" type="submit" />
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
    <NotAuthorized />
  );
};

export default Movie;
