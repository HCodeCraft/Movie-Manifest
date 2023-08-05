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

  const onAddReview = (newReview, movie) => {
    console.log("user from onAddReview", user)
    console.log("movie from onAddReview", movie)
    // Updating user's reviews

    console.log("newReview", newReview);
    const updatedUserReviews = [...user.reviews, newReview];
    const updatedUser = { ...user, reviews: updatedUserReviews };
    setUser(updatedUser);
    // need to update movie's reviews

    const oneMovie = movies.find((movie) => movie.id === newReview.movie_id);
    const updatedReviews = [...oneMovie.reviews, newReview];
    const updatedMovie = { ...oneMovie, reviews: updatedReviews };
    const updatedMovies = movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    console.log("updatedMovies", updatedMovies)
    setMovies(updatedMovies);
    //   const selectedCategory = categories.find(
    //     (c) => c.id === newCraft.category_id
    //   );
    //   const updatedCrafts = [...selectedCategory.crafts, newCraft];
    //   const updatedCategory = { ...selectedCategory, crafts: updatedCrafts };
    //   const updatedCategories = categories.map((category) =>
    //     category.id === updatedCategory.id ? updatedCategory : category
    //   );
    //   setCategories(updatedCategories)

    console.log("newReview", newReview);
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
    // need to setMovies

    // need  to set state for users to not have the deleted review
    // Deleting a review from users

    // const updatedUser = { ...user, movies: newUserMovies };
    // setUser(updatedUser);
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

//   const addReview = (newReview) => {
//     fetch("/reviews", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newReview),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         onAddReview(data);
//         console.log("data from addReview", data)
//         // Not working ^ :(
//         // navigate("/users/movies");
//       });
//   };

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
        onDeleteMovie,
        onDeleteReview,
        onEditReview,
        onEditMovie,
        onAddReview
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
