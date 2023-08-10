import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate } from "react-router-dom";

function EditMovie() {
  const params = useParams();
  const navigate = useNavigate();
  const { loggedIn, movies, onEditMovie } = useContext(UserContext);

  const [movie, setMovie] = useState({
    title: "",
    image_url: "",
    genres: "",
    description: "",
    runtime: "",
    hours_and_min: "",
    link: "",
    created_at: "",
  });

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.id == params.id);

    if (selectedMovie) {
      setMovie(selectedMovie);
    }
  }, [movies]);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedMovie = {
      title: movie.title,
      image_url: movie.image_url,
      genres: movie.genres,
      description: movie.description,
      runtime: movie.runtime,
      link: movie.link,
    };

    fetch(`/movies/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        onEditMovie(data);
        
        setMovie({
          title: "",
          image_url: "",
          description: "",
          genres: "",
          runtime: "",
          link: "",
        });
        navigate(`/movies/${params.id}`);
      });
  };

  return loggedIn ? (
    <>
      <div className="top_banner">
        <br />
        <div>
          <h1 className="title">Edit {movie.title}</h1>
        </div>
        <br />
        <img src={movie.image_url} className="desimage" alt="image of movie"/>
        <br />
        <br />
        <form className="blk" onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            name="title"
            onChange={handleChange}
            type="text"
            value={movie.title}
          />
          <br />
          <br />
          <label>Image url:</label>
          <input
            name="image_url"
            onChange={handleChange}
            type="text"
            value={movie.image_url}
          />
          <br />
          <br />
          <label>Genres:</label>
          <input
            name="genres"
            onChange={handleChange}
            type="text"
            value={movie.genres}
          />
          <br />
          <br />
          <label>Description:</label>
          <textarea
            rows={5}
            cols={20}
            name="description"
            onChange={handleChange}
            value={movie.description}
          />
          <br />
          <br />
          <label>Runtime:</label>
          <textarea
            rows={1}
            cols={5}
            name="runtime"
            onChange={handleChange}
            value={movie.runtime}
          />
          <label> minutes</label>
          <br />
          <br />
          <label>Link:</label>
          <input
            name="link"
            onChange={handleChange}
            type="text"
            value={movie.link}
          />
          <br />
          <br />

          <input className="btn" type="submit" />
          <br />
          <br />
        </form>
      </div>
    </>
  ) : (
    <>
      <br />
      <h1>You're not authorized, please log in or create an account</h1>
    </>
  );
}

export default EditMovie;
