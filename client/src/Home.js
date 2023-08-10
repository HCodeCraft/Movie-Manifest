import React, { useContext, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "./context/user";

function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const { user, login, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.error) {
          setError(user.error);
          setUsername("");
          setPassword("");
        } else {
          login(user);
          setUsername(user.username);
        }
      });
  };

  useEffect(() => {
    console.log("user", user);
  }, [user, loggedIn]);

  console.log("loggedIn", loggedIn);

  if (loggedIn) {
    return (
      <div className="top_banner">
        <h1 className="title">Welcome {user.username}!</h1>
        <br />
        <div className="blk title homebox">
          <br />
          <h1>Feel free to: </h1>
          <br />
          <br />
          <NavLink to={"/movies"}>
            <button className="btn btn-primary">Browse Movies</button>
          </NavLink>
          <br />
          <h2>Or</h2>
          <br />
          <NavLink to={"/movies/new"}>
            <button className="btn btn-primary">Add a Movie</button>
          </NavLink>
          <br />
          <br />
        </div>
      </div>
    );
  } else {
    return (
      <div className="top_banner">
        <br />
        <br />
        <h1 className="title">Welcome to Movie Manifest!</h1>
        <br />
        <br />
        <h2>Where you can add, review and rate your favorite movies!</h2>
        <br />
        <h2> Never forget what you thought of a movie again!</h2>
        <br />
        <br />
        <div className="loginbox blk">
          <h2 className="blk">Please Login: </h2>

          <form className="blk login" onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>{" "}
            <br />
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br />
            <input className="btn" type="submit" />
          </form>
          {error && <h3 className="error">Error: {error}</h3>}

          <h3 className="blk">Or:</h3>
          <div className="blk">
            <button className="btn" onClick={() => navigate(`users/new`)}>
              Create an Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
