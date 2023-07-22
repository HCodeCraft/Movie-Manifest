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
    setMovies([...movies, newMovie]);
  };

  const onAddReview = (newReview) => {
    console.log("newReview", newReview);
    const updatedReviews = [...user.reviews, newReview];
    const updatedUser = { ...user, reviews: updatedReviews };
    setUser(updatedUser);
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
        // not working ^ :(
      });
  };

  const addReview = (newReview) => {
    console.log("user", user);
    console.log("movies", movies);
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
        // Not working ^ :(
        // navigate("/users/movies");
      });
  };

  const onEditMovie= (editedMovie) => {
    const updatedMovies = movies.map((movie) => {
        if (movie.id === editedMovie.id) {
          return editedMovie;
        } else {
          return movie;
        }
      });
      setMovies(updatedMovies);
      // need to update user.movies too

  }

  /// need to give this fuction the id
  const onEditReview = (editedReview) => {
    console.log("editedReview", editedReview)
    // need to edit the movie.reviews
    // const oneMovie = movies.find((movie) => movie.id == editedReview.movie_id);
    // console.log("oneMovie", oneMovie);
    // const updatedMovieReviews = oneMovie.reviews((review) =>
    //   review.id === editedReview.id ? editedReview : review
    // );
    // console.log("updatedMovieReviews", updatedMovieReviews);
    // const updatedMovie = { ...oneMovie, reviews: updatedMovieReviews };
    // console.log("updatedMovie", updatedMovie);
    // const updatedMovies = movies.map((movie) =>
    //   movie.id === updatedMovie.id ? updatedMovie : movie
    // );
    // console.log("updatedMovies", updatedMovies);
    // setMovies(updatedMovies);
    // console.log("movies after update", movies);
    // need to edit the user.reviews
  };

  const onDeleteMovie = (deletedMovie) => {
    // need to update user's movies?
    const newMovies = movies.filter((movie) => movie.id != deletedMovie.id);
    setMovies(newMovies);

    const newUserMovies = user.movies.filter(
      (movie) => movie.id != deletedMovie.id
    );
    const updatedUser = { ...user, movies: newUserMovies };
    setUser(updatedUser);
  };

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
        onDeleteMovie,
        onEditReview,
    onEditMovie }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
