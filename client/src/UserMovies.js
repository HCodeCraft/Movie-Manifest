import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import { useNavigate, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import ReviewCard from "./ReviewCard";

const UserMovies = () => {
  const { user, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();


  const movieList = user.movies
    ?  user.movies.map((movie) => (
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
      ))
    : [];

    useEffect(() => {

    }, [user])

  return loggedIn ? (
    <>
      <div className="top_banner">
        <h1 className="title">My Movies</h1>
      </div>
      <br />
      <div>
        {movieList.length ? (
          <div className="container"> {movieList} </div>
        ) : (
          <div className="top_banner blk">
            <h2>Looks like your list is empty! </h2>
            <br />
            <h2>Feel free to add some movies: </h2>
            <br/>
            <Link to={"/movies/new"}>
              <button className="btn">Add New movie</button>
            </Link>
            <br/>
            <h2>Or</h2>
            <br/>
            <Link to={"/movies"}>
            <button className="btn">Rate Existing Movies</button>
            </Link>
          </div>
        )}
      </div>
    </>
  ) :    <>
  <br/>
  <br/>
  <div className="top_banner">
    <br />
    <h1>You're not authorized, please </h1>
    <br/>
    <Link to={`/`}>
       <button className="btn btn-accent">Log In</button> </Link>
       <br/>
      <h1> or </h1>
      <br/>
      <Link to={`/users/new`}>
       <button className="btn btn-accent">Signup</button> </Link>
       </div>
  </>;
};

export default UserMovies;
