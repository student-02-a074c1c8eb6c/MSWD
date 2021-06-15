import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padd = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create_new" style={padd}>
        create new
      </Link>
      <Link to="/about" style={padd}>
        about
      </Link>
    </div>
  )
}

export default Menu
