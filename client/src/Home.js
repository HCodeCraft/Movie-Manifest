import React from 'react'
import { Link } from "react-router-dom"

function Home() {

    // I want the Login form to dissapear if user is logged in, and
    // I want it to say Welcome <User>! 
  return (
    <div>
        Have User login Here
        <form>
            <label>Username:</label>
            <input name="username" type="text" ></input>
            <label>Password:</label>
            <input name="username" type="text" ></input>
        </form>
        Have a button to make an account
    </div>
  )
}

export default Home