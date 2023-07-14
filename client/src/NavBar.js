import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    <div><h1>Movie Manifest</h1></div>
    <div><Link>Home</Link> <Link>My Movies/Reviews</Link> <Link>All Movies</Link> <Link>Add a Movie</Link></div>
    </>
  )
}

export default NavBar