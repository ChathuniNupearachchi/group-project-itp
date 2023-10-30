import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/fearures/auth/authSlice";
import { logoutUser } from "../../services/authService";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        

       <span className="--fw-thin"><h2>Welcome ,{name}</h2></span> 
        <button onClick={logout} className="--btn--btn-danger">
          Logout
        </button>
      </div>
      <hr className="header-with-shadow"/>
    </div>
  );
};

export default Header;
