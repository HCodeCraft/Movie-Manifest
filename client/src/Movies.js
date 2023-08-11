import React, { useContext } from "react";
import { UserContext } from "./context/user";
import MovieCard from "./MovieCard";
import NotAuthorized from "./NotAuthorized";

const Movies = () => {
  const { loggedIn, movies } = useContext(UserContext);

  const movieList =
    movies.length > 1 &&
    movies.map((movie) => (
      <div key={movie.id}>
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
    <NotAuthorized />
  );
};

export default Movies;
