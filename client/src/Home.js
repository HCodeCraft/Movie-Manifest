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
        login(user)
        setUsername(user.username);
      })
    .catch((error) => {
      setError("An error occurred during login. Please try again.");
      console.error("Error:", error);
    });
  };

  useEffect(() => {

    console.log("user", user)

  }, [user, loggedIn])


 
  if (loggedIn) {
    return (
      <div className="top_banner">
      <h1>Welcome {user.username}!</h1>
      <br/>
     <h2>Feel free to: </h2> 
     <br/>
      <NavLink to={"/movies"}>
        <button>Browse Movies</button>
      </NavLink>
      <br/>
      <h2>Or</h2>
      <br/>
      <NavLink to={"/movies/new"}>
        <button>Add a Movie</button>
      </NavLink>
    </div>
     
    );
  } else {
    return (
      <div className="top_banner">
        <br/>
      <h2>Welcome to Movie Manifest!</h2>
      <br/>
      <h3>Where you can add, review and rate your favorite movies!</h3>
      <h3> Never forget a movie again!</h3>
      <br/>

      <h2>Please Login: </h2>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input> <br/>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input type="submit" />
      </form>
      <br/>
      <h3>Or:</h3>
      <br/>
      <button className="btn" onClick={() => navigate(`users/new`)}>Create an Account</button>
    </div>

    );
  }
}

export default Home;
