import React, { useContext } from "react";
import { UserContext } from "./context/user";
import MovieCard from "./MovieCard"

const Movies = () => {
  const { user, loggedIn, movies } = useContext(UserContext);

  const movieList = movies.map(movie =>  <div> <MovieCard
    key={movie.id}
    title={movie.title}
    genres={movie.genres}
    img_url={movie.image_url}
    link={movie.link}
    runtime={movie.runtime}
    short_description={movie.short_description} 
    hours_and_min={movie.hours_and_min}
  /> </div> )
  return (
    <>
    <div><h1>All movies</h1></div>
    <div  className="container">
      {movieList}
    </div>
    </>
  )
}

export default Movies