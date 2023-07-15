import React, { useContext, useState } from 'react'
import { useNavigate, NavLink } from "react-router-dom"
import { UserContext } from './context/user'

function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { user, login } = useContext(UserContext)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault()

    }

    // I want the Login form to dissapear if user is logged in, and
    // I want it to say Welcome <User>! 
    if (!user || user.error) {
      return (
        <div>
            <h2>Welcome to Movie Manifest!</h2>
            <h3>Where you can add, review and rate your favorite movies!</h3>
               <h3> Never forget a movie again!</h3>
    
          <h2>Please Login: </h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} ></input>
                <label>Password:</label>
                <input name="username" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
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
          <NavLink to={'/movies'}><button>Browse Movies</button></NavLink>
          Or
          <NavLink to={'/movies/new'}><button>Add a Movie</button></NavLink>
        </div>
      )
    }

}

export default Home