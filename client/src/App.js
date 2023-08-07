import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/user";
import Home from "./Home";
import NavBar from "./NavBar";
import Signup from "./Signup";
import Movies from "./Movies";
import UserMovies from "./UserMovies";
import Movie from "./Movie";
import NewMovie from "./NewMovie";
import EditMovie from "./EditMovie";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/movies/new" element={<NewMovie />} />
          <Route path="/users/new" element={<Signup />} />
          <Route path="/users/movies" element={<UserMovies />} />
          <Route path="/movies/:id/edit" element={<EditMovie />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
