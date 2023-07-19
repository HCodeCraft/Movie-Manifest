import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import ReviewCard from "./ReviewCard";

const UserMovies = () => {
  const { user, loggedIn, movies } = useContext(UserContext);

  const navigate = useNavigate();


  const movieList = user.movies
    ? user.movies.map((movie) => (
        <div>
          <MovieCard
            key={movie.id}
            title={movie.title}
            genres={movie.genres}
            img_url={movie.image_url}
            link={movie.link}
            runtime={movie.runtime}
            short_description={movie.short_description}
            hours_and_min={movie.hours_and_min}
          />

          <ReviewCard movie_id={movie.id} />
        </div>
      ))
    : null;

  console.log("movieList", movieList);

  return (
    <>
      <div>
        <h1>{user.username}'s Movies</h1>
      </div>
      <br />
      <div>
        { !!movieList.length ? (
          <div className="container"> {movieList} </div>
        ) : (
          <>
            <h2>Looks like your list is empty! </h2>
            <br />
            <h2>Feel free to add some movies: </h2>
            <Link to={'/movies/new'}><button>Add movie</button></Link>
          </>
        ) }
      </div>
    </>
  );
};

export default UserMovies;
