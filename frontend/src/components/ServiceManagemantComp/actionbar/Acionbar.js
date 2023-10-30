import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectName, SET_LOGIN } from "../../../redux/fearures/auth/authSlice";
import { logoutUser } from "../../../services/authService";

import './actionbar.scss'

const Actionbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
    window.location.reload();
  };


  return (
    <div className="main-ribbon">
        <div className="inventory-management-text">
            COMPLAINTS, RETURNS AND REFUND HANDLING 
        </div>

        <div className="user-details">
          <img className='user-image' src='https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg' alt="profile" />
          <div className="profile-details">
              <span className='username'>{name}</span>
              <span className='designation'>Service Manager</span>
              
          </div>
          <button onClick={logout} className='logout'>Logout</button>
        </div>
    </div>
  )
}

export default Actionbar