import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    // I need to import the user id in here for linking to
    // "My Movies/Reviews" and to display the User's username
  return (
    <>
      <div>
        <h1>Movie Manifest</h1>
      </div>
      <div>
        <Link to={"/"}>Home</Link>{" "}
        <Link to={`/users/#{id}/movies`}>My Movies/Reviews</Link>{" "}
        <Link to={"/movies"}>All Movies</Link>{" "}
        <Link to={"movies/new"}>Add a Movie</Link>
        <p>Logout</p>
      </div>
    </>
  );
};

export default NavBar;
