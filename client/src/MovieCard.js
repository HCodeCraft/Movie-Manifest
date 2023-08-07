import React from "react";
import { Link, useLocation } from "react-router-dom";

const MovieCard = ({
  title,
  genres,
  img_url,
  runtime,
  short_description,
  hours_and_min,
  id,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="card">
        <img className="card-image" src={img_url} />
        <h2 className="movtitle">{title}</h2>
        <h3 className="genres"> {genres}</h3>
        <h4>
          Runtime: {runtime} mins ({hours_and_min})
        </h4>
        <p>{short_description}</p>
        <br />
        <div className="showmore">
          <Link
            to={currentPath === "/users/movies" ? `/movies/${id}` : `${id}`}
          >
            <button className="btn btn-primary">Show More</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
