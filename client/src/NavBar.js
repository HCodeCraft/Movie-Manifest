import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

const NavBar = () => {
  const { user, logout, loggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(() => {
      logout()
      navigate('/')
    })
  }

  // I need to import the user id in here for linking to
  // "My Movies/Reviews" and to display the User's username
  if (loggedIn) {
    return (
      <div>
        <NavLink to={"/"}>Home</NavLink>{" "}
        <NavLink to={`/users/#{id}/movies`}>My Movies/Reviews</NavLink>{" "}
        <NavLink to={"/movies"}>All Movies</NavLink>{" "}
        <NavLink to={"movies/new"}>Add a Movie</NavLink>
        <p>{user ? user.username : ""}</p>
        <button onClick={logoutUser}>Logout</button>
        <br />
      </div>
    );
  } else {
    return (
      <>
        <div>
          <h1>Movie Manifest</h1>
          {/* <NavLink to={'/signup'}>Signup</NavLink> */}
        </div>
      </>
    );
  }
};

export default NavBar;
