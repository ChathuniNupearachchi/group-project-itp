import React from 'react'

import './actionbar.scss'

const Actionbar = () => {
  return (
    <div className="main-ribbon">
        <div className="inventory-management-text">
            COMPLAINTS, RETURNS AND REFUND HANDLING 
        </div>

        <div className="user-details">
          <img className='user-image' src='https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg' alt="profile" />
          <div className="profile-details">
              <span className='username'>M.Kavindu</span>
              <span className='designation'>Service Manager</span>
              
          </div>
          <button className='logout'>Logout</button>
        </div>
    </div>
  )
}

export default Actionbar