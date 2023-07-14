import React, { useContext } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from './context/user'

function Home() {
  const { user, login } = useContext(UserContext)
    const navigate = useNavigate();

    // I want the Login form to dissapear if user is logged in, and
    // I want it to say Welcome <User>! 
    if (!user || user.error) {
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
    else {
      return (
        <div>
          <h3>Welcome {user.username}!</h3>
          Feel free to:
          <Link to={'/movies'}><button>Browse Movies</button></Link>
          Or
          <Link to={'/movies/new'}><button>Add a Movie</button></Link>
        </div>
      )
    }

}

export default Home