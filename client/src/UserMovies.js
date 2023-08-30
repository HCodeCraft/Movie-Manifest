import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import ReviewCard from "./ReviewCard";
import NotAuthorized from "./NotAuthorized";

const UserMovies = () => {
  const { user, loggedIn } = useContext(UserContext);

  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    const myMovies = user.movies;
    if (myMovies) {
      setUserMovies(myMovies);
    }
  }, [user]);

  const movieList =
    userMovies &&
    userMovies.map((movie) => (
      <div className="cardbox" key={movie.id}>
        <MovieCard
          title={movie.title}
          genres={movie.genres}
          img_url={movie.image_url}
          link={movie.link}
          runtime={movie.runtime}
          short_description={movie.short_description}
          hours_and_min={movie.hours_and_min}
          id={movie.id}
        />

        <ReviewCard movie_id={movie.id} />
      </div>
    ));

  return loggedIn ? (
    <>
      <div className="top_banner">
        <h1 className="title">My Movies</h1>
      </div>
      <br />
      <div>
        {userMovies?.length > 0 ? (
          <div className="container"> {movieList} </div>
        ) : (
          <div className="nomoviebox">
            <div className="top_banner blk nomovies">
              <h2>Looks like your list is empty! </h2>
              <br />
              <h2>Feel free to add some movies: </h2>
              <br />
              <Link to={"/movies/new"}>
                <button className="btn">Add New movie</button>
              </Link>
              <br />
              <h2>Or</h2>
              <br />
              <Link to={"/movies"}>
                <button className="btn">Rate Existing Movies</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <NotAuthorized />
  );
};

export default UserMovies;
