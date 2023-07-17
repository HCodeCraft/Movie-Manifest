import React, { useState, useContext } from 'react'
import { UserContext } from "./context/user";
import { useNavigate, Link } from "react-router-dom"

const NewMovie = () => {

  // When a new movie is created I want to have a checkbox that says 
  // Unwatched ? Add movie to your list with an empty review
  // maybe have a dropdown to create a review for it at the same time?

    const [movie, setMovie] = useState({
    title: "",
    image_url: "",
    genres: "",
    description: "",
    runtime: 0,
    link: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newCategory = {
    //   name: category.name,
    //   image: category.image,
    //   description: category.description,
    // };

    // fetch("http://localhost:9292/categories", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newCategory),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     onAddCategory(data);
    //     navigate("/categories");
    //   });
  };

  return (
    <div >
      <br />
      <div>
        <h1>Add a Movie</h1>
      </div>
      <br />
      <img src="https://i.pinimg.com/736x/76/5c/1b/765c1b4b1ef541278400a4564d437983--movies-at-nostalgia.jpg" />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>Movie Title:</label>
        <input name="title" onChange={handleChange} type="text" /> <br />
        <br />
        <label>Image url:</label>
        <input name="image_url" onChange={handleChange} type="text" /> <br />
        <br />
        <label>Genres:</label>
        <input name="genres" onChange={handleChange} type="text" /> <br />
        <br />
        <label>Description:</label>
        <input name="description" onChange={handleChange} type="text" /> <br />
        <br />
        {/* Change to textbox ^ */}
        <label>Runtime (in minutes):</label>
        <input name="runtime" onChange={handleChange} type="text" /> <br />
        <br />
        <label>Link:</label>
        <input name="link" onChange={handleChange} type="text" /> <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewMovie