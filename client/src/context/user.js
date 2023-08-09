import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (user && !data.errors) {
          console.log("data from 21", data);
          setLoggedIn(true);
          fetchMovies();
          setUserMovies(user.movies)
        } else {
          console.log("data", data);
          console.log("data.errors", data.errors);
        }
      });
  }, []);

  //   useEffect(()=> {
  //     setUserMovies(user.movies)
  //   }, [user])

  const fetchMovies = () => {
    fetch("/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        // setUserMovies(user?.movies)
        // console.log("user.movies from in fetch", user.movies)
      });
  };

  //   useEffect(() => {
  //     // Fetch the user's movies only if it's not already fetched
  //     if (loggedIn && userMovies.length === 0) {
  //       getUserMovies();
  //     }
  //   }, [loggedIn, userMovies]);

  //   const getUserMovies = () => {
  //     setUserMovies(user.movies)
  //   }

  const login = (user) => {
    setUser(user);
    console.log("user.movies login", user.movies)

    setLoggedIn(true);
   setUsername(user.username);
    // setUserMovies(user.movies)
    // console.log("userMovies from login", user.movies)
    fetchMovies(user);
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
    // updating user's reviews
    const updatedUserReviews = [...user.reviews, newReview];
    const updatedUser = { ...user, reviews: updatedUserReviews };
    setUser(updatedUser);
    // need to update movie's reviews

    // updating movies
    const oneMovie = movies.find((movie) => movie.id === newReview.movie_id);
    console.log("initial oneMovie.reviews", oneMovie.reviews);
    const updatedReviews = [...oneMovie.reviews, newReview];
    const updatedMovie = { ...oneMovie, reviews: updatedReviews };
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    console.log("updatedMovies", updatedMovies);
    setMovies(updatedMovies);
    // I FEEL LIKE THERES SOME UNNESSISARY CODE HERE, AN ASSOCIATION PROBABLY TOOK
    // care of some of this state
    if (oneMovie) {
      // Check if oneMovie is already present in user.movies
      const movieAlreadyExists = user.movies.some(
        (movie) => movie.id === oneMovie.id
      );

      // If oneMovie is not already in user.movies, add it to the array
      if (!movieAlreadyExists) {
        setUser((prevUser) => ({
          ...prevUser,
          movies: [...prevUser.movies, oneMovie],
        }));
        console.log("There was oneMovie");
      }
    }
  };

  const onDeleteReview = (deletedReview) => {
    // UPDATING movie.reviews STATE
    const oneMovie =
      movies && movies.find((movie) => movie.id === deletedReview.movie_id);
    const newMovieReviews = oneMovie.reviews.filter(
      (review) => review.id !== deletedReview.id
    );
    const updatedMovie = { ...oneMovie, reviews: newMovieReviews };
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
    // need to update state for users.reviews

    // need  to set state for users to not have the deleted review
    // Deleting a review from users

    const newUserReviewList = user.reviews.filter(
      (review) => review.id !== deletedReview.id
    );
    setUser((prevUser) => ({ ...prevUser, reviews: newUserReviewList }));

    // not updating the reveiws properly ^

    // if the movie has no user.reviews I want it to redirect to MyMovies
    const userReviewList = updatedMovie.reviews.find(
      (review) => review.user_id === user.id
    );
    console.log("userReviewList", userReviewList);
    if (!userReviewList) {
      const newUserMovies = user.movies.filter(
        (movie) => movie.id != deletedReview.movie_id
      );
      setUser({ ...user, movies: newUserMovies });
      console.log("newUserMovies", newUserMovies);
      console.log("user after no reviews", user);
      navigate(`users/movies`);
    }
  };

  const addMovie = (newMovie) => {
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
        console.log("newMovie", newMovie);
        // Optionally, navigate to a new page after successful movie creation
        // navigate("/movies");
      });
  };

  const onEditMovie = (editedMovie) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === editedMovie.id) {
        return editedMovie;
      } else {
        return movie;
      }
    });
    setMovies(updatedMovies);
    // need to update user.movies too
  };

  /// need to give this fuction the id
  const onEditReview = (editedReview) => {
    // need to edit the movie.reviews
    const oneMovie = movies.find((movie) => movie.id == editedReview.movie_id);
    const updatedMovieReviews = oneMovie.reviews.map((review) =>
      review.id === editedReview.id ? editedReview : review
    );
    const updatedMovie = { ...oneMovie, reviews: updatedMovieReviews };
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
    // adding the review to user's review's
    const updatedUserReviews = user.reviews.map((review) =>
      review.id === editedReview.id ? editedReview : review
    );
    setUser({ ...user, reviews: updatedUserReviews });
  };

  const onDeleteMovie = (deletedMovie) => {
    const newMovies = movies.filter((movie) => movie.id != deletedMovie.id);
    setMovies(newMovies);

    const newUserMovies = user.movies.filter(
      (movie) => movie.id != deletedMovie.id
    );
    const updatedUser = { ...user, movies: newUserMovies };
    setUser(updatedUser);
  };

//   console.log("user.movies", user.movies)
console.log("user in user.js", user)


  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        loggedIn,
        movies,
        userMovies,
        addMovie,
        onDeleteMovie,
        onDeleteReview,
        onEditReview,
        onEditMovie,
        onAddReview,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
