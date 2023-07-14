import React from 'react'
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate();

    // I want the Login form to dissapear if user is logged in, and
    // I want it to say Welcome <User>! 
  return (
    <div>
        <h2>Welcome to Movie Manifest!</h2>
        <h3>Where you can add, review and rate your favorite movies!</h3>
           <h3> Never forget a movie again!</h3>

      <h2>Please Login: </h2>
        <form>
            <label>Username:</label>
            <input name="username" type="text" ></input>
            <label>Password:</label>
            <input name="username" type="text" ></input>
            <input type="submit" />
        </form>
        <h3>Or:</h3>
        <button onClick={() => navigate(`users/new`)}>Create an Account</button>
    </div>
  )
}

export default Home