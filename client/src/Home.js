import React from 'react'
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate();

    // I want the Login form to dissapear if user is logged in, and
    // I want it to say Welcome <User>! 
  return (
    <div>
      <h2>Login: </h2>
        <form>
            <label>Username:</label>
            <input name="username" type="text" ></input>
            <label>Password:</label>
            <input name="username" type="text" ></input>
            <input type="submit" />
        </form>
        <button onClick={() => navigate(`users/new`)}>Create an Account</button>
    </div>
  )
}

export default Home