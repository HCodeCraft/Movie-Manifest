import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import NewUserForm from "./NewUserForm";
import Movies from "./Movies"
import UserMovies from "./UserMovies"
import Movie from "./Movie";
import NewMovieForm from "./NewMovieForm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/movies/new" element={<NewMovieForm />} />
        <Route path="/users/new" element={<NewUserForm/>} />
        <Route path="/users/:id/movies" element={<UserMovies/>} />
      </Routes>
    </>
  );
}

export default App;
