import React from "react";
import { Link, useLocation } from "react-router-dom";



const MovieCard = ({ title, genres, img_url, runtime, short_description, hours_and_min, id}) => {

    const location = useLocation();
    const currentPath = location.pathname;


  

  return (
    <>
    <div className="card">
      <img className="card-image" src={img_url} />
      <h2>{title}</h2>
      <h3> {genres}</h3>
      <h4>Runtime: {runtime} mins ({hours_and_min})</h4>
      <p>{short_description}</p>
      <br/>
      <Link to={ currentPath === '/users/movies' ? `/movies/${id}` :`${id}`}><button>Show More</button></Link>
    </div>
    </>
  );
};

export default MovieCard;
