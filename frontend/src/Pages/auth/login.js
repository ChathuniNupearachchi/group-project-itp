//rafce
import React, { useState } from 'react'
import {BiLogInCircle} from "react-icons/bi"
import Card from "../../components/card/card"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from "../../redux/fearures/auth/authSlice"


const initialState = {
  Email: "",
  password: "",
}

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const { Email , password} = formData

  

  const handleInputChange = (e) =>{
    const {name,value} = e.target
    setformData({...formData,[name]:value})
  }

  const login = async(e) =>{
    e.preventDefault()
    if(!Email||!password){
      return toast.error("All Fild must be fill")
    }
    if(!validateEmail(Email)){
      return toast.error("Enter valid email")
    }

    const userData = {
      Email,password
    }

    setIsLoading(true)
    try{

      const data = await loginUser(userData)
      if(data.ActiveState===false){
        toast.warning("You are suspended")
        navigate("/login")
      }

      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))

      if(data.UserRole==="Customer"){
        navigate("/Customerdashbord")

      }
      else if(data.UserRole ==="Supply Manager"){
        navigate("/admin/inventory/supplier-registration")
        window.location.reload();
      }

      else if(data.UserRole ==="Staff Manager"){
        navigate("/admin/staff/AddStaff")
        window.location.reload();
      }

      else if(data.UserRole ==="Inventory Manager"){
        navigate("/Inventory-overView")
        window.location.reload();
      }

      else if(data.UserRole ==="Delivary Manager"){
        navigate("/view-vehicle")
        window.location.reload();
      }

      else if(data.UserRole ==="Service Manager"){
        navigate("/admin/service/MonthlyReport")
        window.location.reload();
      }

      else if(data.UserRole ==="Order Manager"){
        navigate("/Order-dashbord")
        window.location.reload();
      }
      else if(data.UserRole ==="UserManager"){
        navigate("/usermanager")
        

      }

      
      
      setIsLoading(false)
      console.log(data);

    }catch(error){
      setIsLoading(false)
      toast.error(error.message)

    }


    console.log(formData);
  }



  return (
    <div className="logincontainer" style={{ background: 'rgb(221, 221, 221)', width: '100%', height: '100vh' }}>
      <Card>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <form
            onSubmit={login}
            style={{
              textAlign: 'center',
              marginTop: '100px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              width: '700px',
            }}
          >
            <BiLogInCircle size={35} color="#0073e6" />
            <h2 style={{ margin: '10px 20px' }}>Login</h2>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={handleInputChange}
              style={{
                margin: '5px 5px 5px 5px',
                padding: '5px',
                borderRadius: '3px',
                width: '500px',
              }}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              style={{
                margin: '5px 5px 5px 5px',
                padding: '5px',
                borderRadius: '3px',
                width: '500px',
              }}
              required
            />
            <br />
            <button
              type="submit"
              style={{
                margin: '10px 0',
                padding: '10px 20px',
                background: '#0074D9',
                color: 'white',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >
              Login
            </button>
            <br></br>
            <span style={{ display: 'block' }}>
            <Link to="/fogetPass">Forgot password</Link>
            
              <br/>
              <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Login
