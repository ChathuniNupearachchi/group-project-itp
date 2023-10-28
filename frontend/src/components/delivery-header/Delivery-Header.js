import React from 'react'

import './Delivery-Header.scss'
import UserProfile from '../../assets/man-character.png'

const Header = () => {
  return (
    <div className="main-ribbon">
        <div className="inventory-management-text">
            Welcome, Delivery Department
        </div>

        <div className="user-details">
          <img className='user-image' src={UserProfile} alt="profile" />
          <div className="profile-details">
              <span className='username'>Senil Dimlaka</span>
              <span className='designation'>Delivery Manager</span>
          </div>
          <div >
            <button className='logout'>Logout</button>
          </div>
        </div>
    </div>
  )
}

export default Header