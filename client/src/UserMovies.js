import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import { useNavigate, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import ReviewCard from "./ReviewCard";

const UserMovies = () => {
  const { user, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const uniqueMovies = [...new Set(user.movies)]

  console.log("uniqueMovies", uniqueMovies)

  const movieList = user.movies
    ?  uniqueMovies.map((movie) => (
        <div key={movie.id}>
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
      ))
    : [];

    useEffect(() => {

      console.log("user", user)

    }, [user])

  return user ? (
    <>
      <div className="top_banner">
        <h1>My Movies</h1>
      </div>
      <br />
      <div>
        {movieList.length ? (
          <div className="container"> {movieList} </div>
        ) : (
          <>
            <h2>Looks like your list is empty! </h2>
            <br />
            <h2>Feel free to add some movies: </h2>
            <Link to={"/movies/new"}>
              <button>Add movie</button>
            </Link>
          </>
        )}
      </div>
    </>
  ) : null;
};

export default UserMovies;
