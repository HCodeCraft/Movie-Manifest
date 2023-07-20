import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.error) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
          fetchUserMovies();
        }
      });
  }, []);

  const fetchUserMovies = () => {
    fetch("/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  };

  const login = () => {
    setUser(user);
    console.log("user", user)
    setLoggedIn(true);
    setUsername(user.username);
  };

  const logout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const signup = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const onAddMovie = (newMovie) => {
    console.log("newMovie", newMovie);
    // setMovies([...movies, newMovie])
  };

  const onAddReview = (newReview) => {
    console.log("newReview", newReview);
    // const updatedReviews = [...user.reviews, newReview]
    // const updatedUser = {...user, reviews: updatedReviews}
    // setUser(updatedUser)
  };

  const addMovie = (newMovie) => {


    console.log("newMovie", newMovie);

    fetch("/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddMovie(data);
      });
  };

  const addReview = (newReview) => {


    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddReview(data);
        // navigate("/users/movies");
      });
  };

  console.log("user from context", user);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        loggedIn,
        movies,
        addMovie,
        addReview,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
