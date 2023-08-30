import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import Banner from "./Images/MMlogo.jpg";

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

  if (loggedIn) {
    return (
      <>
        <div className="topdiv">
          <div className="bannerbox">
            <img id="b" src={Banner} alt="Movie Manifest Title Banner" />
          </div>
          <header className="full-screen-header">
            <nav className="nav nav-top">
              <br />
              <br />
              <br />
              <ul className="nav-list">
                <li>
                  <NavLink to={"/"}>Home</NavLink>{" "}
                </li>
                <li>
                  <NavLink to={"/users/movies"}>My Movies/Reviews</NavLink>{" "}
                </li>
                <li>
                  <NavLink to={"/movies"}>All Movies</NavLink>{" "}
                </li>
                <li>
                  <NavLink to={"movies/new"}>Add a Movie</NavLink>
                </li>
                <li>
                  <h3 className="username">{user ? user.username : ""}</h3>
                </li>
                <li>
                  {" "}
                  <button className="btn" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        <br />
        <br />
      </>
    );
  } else {
    return (
      <div className="topdiv">
        <div className="bannerbox">
          <img id="b" src={Banner} alt="Movie Manifest Title Banner" />
        </div>
      </div>
    );
  }
};

export default NavBar;
