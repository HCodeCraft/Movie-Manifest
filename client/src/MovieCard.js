import React from "react";
import { Link } from "react-router-dom";
import ReviewCard from './ReviewCard'

const MovieCard = ({ title, genres, img_url, runtime, short_description, hours_and_min}) => {



  

  return (
    <>
    <div class="card">
      <img className="card-image" src={img_url} />
      <h2>{title}</h2>
      <h3> {genres}</h3>
      <h4>Runtime: {runtime} mins ({hours_and_min})</h4>
      <p>{short_description}</p>
      <br/>
      <Link><button>Show More</button></Link>
    </div>
    </>
  );
};

export default MovieCard;
