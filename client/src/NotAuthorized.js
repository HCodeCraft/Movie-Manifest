import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <>
      <br />
      <br />
      <div className="top_banner">
        <br />
        <h1>You're not authorized, please </h1>
        <br />
        <Link to={`/`}>
          <button className="btn btn-accent">Log In</button>{" "}
        </Link>
        <br />
        <h1> or </h1>
        <br />
        <Link to={`/users/new`}>
          <button className="btn btn-accent">Signup</button>{" "}
        </Link>
      </div>
    </>
  );
};

export default NotAuthorized;
