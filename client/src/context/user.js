import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

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

    setLoggedIn(true);
    setUsername(user.username);
    fetchMovies();
    console.log("movies were fetched", movies);
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
    setMovies([...movies, newMovie]);
  };

  const onAddReview = (newReview, createdMovie) => {
    // Update user's reviews
    const updatedUserReviews = [...user.reviews, newReview];
    const updatedUser = { ...user, reviews: updatedUserReviews };
    setUser(updatedUser);

    console.log("movies from onAddReview", movies);
    // Find the movie associated with the new review
    console.log("createdMovie", createdMovie);

    if (createdMovie) {
      // Include the newReview in the createdMovie
      const updatedMovie = {
        ...createdMovie,
        reviews: [...createdMovie.reviews, newReview],
      };

      // Update the movies array with the updatedMovie
      const updatedMovies = [...movies, updatedMovie];
      console.log("updatedMovies with createdMovie", updatedMovies);
      setMovies(updatedMovies);

      // Add the movie to user's movie list if it's not there already
      const movieAlreadyExists = user.movies.some(
        (movie) => movie.id === createdMovie.id
      );
      if (!movieAlreadyExists) {
        setUser((prevUser) => ({
          ...prevUser,
          movies: [...prevUser.movies, createdMovie],
        }));
      }
    } else {
      const oneMovieIndex = movies.findIndex(
        (movie) => movie.id === newReview.movie_id
      );
      if (oneMovieIndex !== -1) {
        const updatedMovies = [...movies];
        const oneMovie = updatedMovies[oneMovieIndex];
        const updatedReviews = [...oneMovie.reviews, newReview];
        const updatedMovie = { ...oneMovie, reviews: updatedReviews };
        updatedMovies[oneMovieIndex] = updatedMovie;

        setMovies(updatedMovies);
      }

      const existingMovie = movies.find(
        (movie) => movie.id === newReview.movie_id
      );

      const movieAlreadyExists = user.movies.some(
        (movie) => movie.id === newReview.movie_id
      );

      if (!movieAlreadyExists) {
        setUser((prevUser) => ({
          ...prevUser,
          movies: [...prevUser.movies, existingMovie],
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Movie creation failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data from addMovie", data);
        onAddMovie(data);
        return data;
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        // You can also setErrors here if needed
        throw error; // Re-throw the error to be handled further up the chain
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
      
        // if (data.error) {
        //   setErrors(...errors, data.error);
        //   console.log("errorss from addREview", errors)
        // }

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
        errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
