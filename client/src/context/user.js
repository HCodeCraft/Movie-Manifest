import React, { useState, useEffect } from 'react'

const UserContext = React.createContext()

function UserProvider({ children}) {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [movies, setMovies] = useState([])
    const [username, setUsername] = useState("");


    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setUser(data)
            if (data.error) {
                setLoggedIn(false)
            } else {
                setLoggedIn(true)
                fetchUserMovies()
            }
        })
    }, [])

    const fetchUserMovies = () => {
        fetch('/movies')
        .then(res => res.json())
        .then(data => {
            setMovies(data)
        })
    }

    const login = () => {
        setUser(user)
        setLoggedIn(true)
        setUsername(user.username)
    }

    const logout = () => {
        setUser({})
        setLoggedIn(false)
    }

    const signup = (user) => {
        setUser(user)
        setLoggedIn(true)

    }

    const addMovie = (newMovie) => {


    }

    console.log("user from context", user)

  return (
    <UserContext.Provider value={({user, login, logout, signup, loggedIn, movies})}>
        {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }