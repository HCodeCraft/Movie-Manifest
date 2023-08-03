import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

const NavBar = () => {
  const { user, logout, loggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const logoutUser = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
      navigate("/");
    });
  };

  // I need to import the user id in here for linking to
  // "My Movies/Reviews" and to display the User's username
  if (loggedIn) {
    return (
      <header className="full-screen-header">
        <nav className="nav nav-top">
          <ul className="nav-list">
        <li><NavLink to={"/"}>Home</NavLink>{" "}</li>
        <li><NavLink to={"/users/movies"}>My Movies/Reviews</NavLink>{" "}</li>
        <li><NavLink to={"/movies"}>All Movies</NavLink>{" "}</li>
        <li><NavLink to={"movies/new"}>Add a Movie</NavLink></li>
       <li><h3>{user ? user.username : ""}</h3></li> 
       <li> <button onClick={logoutUser}>Logout</button></li>
        </ul>
        </nav>
        <br/>
        <br/>
        <br/>
      </header>
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
