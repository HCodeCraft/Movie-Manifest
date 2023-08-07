import React, { useContext } from "react";
import { UserContext } from "./context/user";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const Movies = () => {
  const { user, loggedIn, movies } = useContext(UserContext);

  console.log("movies", movies);
  console.log("loggedIn", loggedIn);

  const movieList =
    movies.length > 1 &&
    movies.map((movie) => (
      <div>
        {" "}
        <MovieCard
          key={movie.id}
          title={movie.title}
          genres={movie.genres}
          img_url={movie.image_url}
          link={movie.link}
          runtime={movie.runtime}
          short_description={movie.short_description}
          hours_and_min={movie.hours_and_min}
          id={movie.id}
        />{" "}
      </div>
    ));
  return loggedIn ? (
    <div className="top_banner">
      <div className="title">
        <h1>All movies</h1>
      </div>
      <br />
      <div className="container">{movieList}</div>
    </div>
  ) : (
    <>
      <br />
      <br />
      <div className="top_banner">
        <br />
        <h1>You're not authorized, please </h1>
        <br />
        <Link to={`/`}>
          <button className="btn btn-accent">Log In</button>{" "}
        </Link>
        <br />
        <h1> or </h1>
        <br />
        <Link to={`/users/new`}>
          <button className="btn btn-accent">Signup</button>{" "}
        </Link>
      </div>
    </>
  );
};

export default Movies;
