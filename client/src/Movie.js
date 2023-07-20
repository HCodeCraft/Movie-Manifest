import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loggedIn, movies } = useContext(UserContext);

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

  console.log("user from movie", user)
  console.log("movies from movie", movies)

  const [review, setReview] = useState({
    review: "",
    watched: false,
    rating: 0,
  });

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

  return (
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
        <div>
          {review.watched ? (
            <>
              {" "}
              <h2>My Review</h2> <br />
              {review.stars}
              <br />
              <br />
              {review.review}
              <br/>
              <br />
            </>
          ) : (
            <>
              <h3>Unwatched</h3> <br /> <button>Add Review</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
