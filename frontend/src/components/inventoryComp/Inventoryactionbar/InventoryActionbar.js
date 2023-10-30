import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectName, SET_LOGIN } from "../../../redux/fearures/auth/authSlice";
import { logoutUser } from "../../../services/authService";

import './InventoryActionbar.scss'

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
    <div className="header-ribbon">
        <div className="inventory-text">
            Inventory Management
        </div>
        <div className="profile-details">
              <span className='username'>{name}</span>
              <span className='designation'>ORDER Manager</span>
              
          </div>
          <button onClick={logout} className='logout'>Logout</button>

        
    </div>
  )
}

export default Actionbar;