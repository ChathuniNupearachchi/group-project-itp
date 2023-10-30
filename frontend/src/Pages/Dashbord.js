import React from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../services/authService'

const Dashbord=()=> {
  return (
    
    <div>
      <h1> Customer Dashbord</h1>
      <button>
          <Link to="/profile" >Profile </Link>
          </button>
          <button onClick={logoutUser} >Logout</button>
    </div>
  )
}

export default Dashbord

