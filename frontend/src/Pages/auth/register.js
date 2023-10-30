//rafce
import React, { useState } from 'react'
import {TiUserAddOutline} from "react-icons/ti"
import Card from "../../components/card/card"
import { toast } from 'react-toastify'
import {registerUser, validateEmail} from "../../services/authService"
import Loader from '../../components/loader/Loader'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SET_LOGIN, SET_NAME } from '../../redux/fearures/auth/authSlice'




const initialState = {
  name: "",
  Email: "",
  password: "",
  password2: "",
}


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {name,Email,password,password2} = formData

  const handleInputChange = (e) =>{
    const {name,value} = e.target
    setformData({...formData,[name]:value})
  }

  const register = async(e) =>{
    e.preventDefault()
    
    //validation
    if(!name||!Email||!password){
      return toast.error("All Fild must be fill")
    }
    if(!validateEmail(Email)){
      return toast.error("Enter valid email")
    }
    if(password.length<6){
      return toast.error("Password must be up to 6 charactor")
    }
    if(password!==password2){
      return toast.error("Conform password does not match!")
    }

    const userData = {
      name,Email,password
    }
    setIsLoading(true)

    try{
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashbord")
      setIsLoading(false)

    }catch(error){
      setIsLoading(false)
      toast.error(error.message)

    }
  }

  return (
    
    <div className={`regcontainer`}>
    {isLoading && <Loader />}
    <Card>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgb(221, 221, 221)',
          width: '100%',
          height: '100vh',
        }}
      >
        <form
          onSubmit={register}
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
          <TiUserAddOutline size={35} color="#0073e6" />
          <h2 style={{ margin: '10px 20px' }}>Register</h2>
          <input
            type="email"
            placeholder="Email"
            name="Email"
            required
            value={Email}
            onChange={handleInputChange}
            style={{
              margin: '5px 5px 5px 5px',
              padding: '5px',
              borderRadius: '3px',
              width: '500px',
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={handleInputChange}
            style={{
              margin: '5px 5px 5px 5px',
              padding: '5px',
              borderRadius: '3px',
              width: '500px',
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={handleInputChange}
            style={{
              margin: '5px 5px 5px 5px',
              padding: '5px',
              borderRadius: '3px',
              width: '500px',
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            required
            value={password2}
            onChange={handleInputChange}
            style={{
              margin: '5px 5px 5px 5px',
              padding: '5px',
              borderRadius: '3px',
              width: '500px',
            }}
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
              ':hover': {
                background: '#ffffff',
              },
            }}
          >
            Register
          </button>
        </form>
      </div>
    </Card>
  </div>
  )
}

export default Register
