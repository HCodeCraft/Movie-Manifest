import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/users/new" element={<NewUserForm/>} /> */}
        {/* <Route path="/lists/new" element={NewListForm} /> */}
      </Routes>
    </>
  );
}

export default App;
