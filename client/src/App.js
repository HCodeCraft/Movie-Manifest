import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
