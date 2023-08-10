import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data && !data.errors) {
          setLoggedIn(true);
          fetchMovies();
        }
      });
  }, []);

  const fetchMovies = () => {
    fetch("/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  };

  const login = (user) => {
    setUser(user);
    console.log("user.movies login", user.movies);

    setLoggedIn(true);
    setUsername(user.username);
    fetchMovies();
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
    console.log("newMovie from onAddMovie", newMovie);
    setMovies([...movies, newMovie]);
    return movies
  };

  const onAddReview = (newReview, createdMovie) => {
    console.log("newReview from onAddReview", newReview);
    // Update user's reviews
    const updatedUserReviews = [...user.reviews, newReview];
    const updatedUser = { ...user, reviews: updatedUserReviews };
    setUser(updatedUser);

    console.log("movies from onAddReview", movies)
    // Find the movie associated with the new review
    console.log("createdMovie", createdMovie)
    let oneMovie;
    if (createdMovie) {
        oneMovie = createdMovie;
    } else {
        oneMovie = movies.find((movie) => movie.id === newReview.movie_id);
    }
    
 
    if (oneMovie) {
      // Update movie's reviews Not getting oneMovie when submitting a movie & review tog
      console.log("oneMovie", oneMovie)
      const updatedReviews = [...oneMovie.reviews, newReview];
      const updatedMovie = { ...oneMovie, reviews: updatedReviews };
      const updatedMovies = movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      console.log("updatedMovie", updatedMovie)
      setMovies(updatedMovies);

      // Check if the movie is already in user's movie list
      const movieAlreadyExists = user.movies.some(
        (movie) => movie.id === oneMovie.id
      );

      // If not, add the movie to user's movie list
      if (!movieAlreadyExists) {
        setUser((prevUser) => ({
          ...prevUser,
          movies: [...prevUser.movies, oneMovie],
        }));
      }
    } 
  };

  const onDeleteReview = (deletedReview) => {
    const oneMovie = movies.find(
      (movie) => movie.id === deletedReview.movie_id
    );
    const newMovieReviews = oneMovie.reviews.filter(
      (review) => review.id !== deletedReview.id
    );
    const updatedMovie = { ...oneMovie, reviews: newMovieReviews };
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    setMovies(updatedMovies);

    const newUserReviewList = user.reviews.filter(
      (review) => review.id !== deletedReview.id
    );
    setUser((prevUser) => ({ ...prevUser, reviews: newUserReviewList }));

    const userReviewList = updatedMovie.reviews.find(
      (review) => review.user_id === user.id
    );
    if (!userReviewList) {
      const newUserMovies = user.movies.filter(
        (movie) => movie.id != deletedReview.movie_id
      );
      setUser({ ...user, movies: newUserMovies });
      navigate(`users/movies`);
    }
  };

  const addMovie = (newMovie) => {
    const requestBody = {
      ...newMovie,
    };

    if (newMovie.reviews) {
      requestBody.reviews = newMovie.reviews;
    }

    return fetch("/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddMovie(data);
    
        return data;
      });
  };

  const addReview = (newReview, createdMovie) => {
    fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddReview(data, createdMovie);
        console.log("Here's the data from addReview", data)
        console.log("That's being sent to onAddReview")
        // I need to update movie state to add the review
  
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
    const userUpdatedMovies = user.movies.map((movie) => {
      if (movie.id === editedMovie.id) {
        return editedMovie;
      } else {
        return movie;
      }
    });
    setUser({ ...user, movies: userUpdatedMovies });
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
