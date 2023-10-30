import React, { useState } from 'react'
import { Staffregister, validateEmail } from '../../services/authService'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { TiUserAddOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import './staffRegister.scss'




const initialState = {
    name: "",
    Email: "",
    password: "",
    password2: "",
    phone:"",
    UserRole:""
  }

const Stfregister = () => {

  const[isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {name,Email,password,password2,phone,UserRole} = formData
  const navigate = useNavigate()

  const handleInputChange = (e) =>{
    const {name,value} = e.target
    setformData({...formData,[name]:value})
  }

  const register = async(e) =>{
    e.preventDefault()
    
    //validation
    if(!name||!Email||!password||!UserRole){
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
      name,Email,password,phone,UserRole
    }
    setIsLoading(true)

    try{
      const data = await Staffregister(userData)
      setIsLoading(true)
      window.location.reload();
      toast.success("User Registration Successful")
      


    }catch(error){
      setIsLoading(false)
      toast.error(error.message)

    }
  }
  return (
    <div> 
      {isLoading && <Loader/>}
        <div>
          
          <div style={{marginLeft:'10px', marginTop:'20px'}}>
            <center>
          
          </center>
          <div>
          <form onSubmit={register} style={{
            border: '1px solid #ccc', 
            borderRadius: '8px',      
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', 
            padding: '20px',         
            width: '700px',          
            margin: '0 auto',
            backgroundColor:'#E3E3E3'        
          }}>
            <h2 style={{marginRight:'auto' , color:'#E75E11'}}>Staff Register form<hr></hr></h2>
            
            <lable style={{marginRight:'auto' , color:'#167CCC' , paddingLeft:'3px',  fontWeight: 'bold'}}>Name :</lable>
            <input type='text' placeholder='Name' name='name' required value={name} onChange={handleInputChange} pattern="[A-Za-z]+" title="Please enter letters only"/><br></br>

            <lable style={{marginRight:'auto' , color:'#167CCC' , paddingLeft:'3px',  fontWeight: 'bold'}}>Email :</lable>
            <input type='email' placeholder='Email' name='Email' required value={Email} onChange={handleInputChange}/><br></br>

            <lable style={{marginRight:'auto' , color:'#167CCC' , paddingLeft:'3px',  fontWeight: 'bold'}}>Phone No :</lable>
            <input type='text' placeholder='phone number' name='phone' required value={phone} onChange={handleInputChange} pattern="[0-9]*" title="Please enter valid phone number with 10 digit"/><br></br>

            <lable style={{marginRight:'auto' , color:'#167CCC' , paddingLeft:'3px',  fontWeight: 'bold'}}>Role :</lable>
            <select name='UserRole' value={UserRole} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Delivary Manager"> Delivary Manager</option>
                <option value="Driver">Driver</option>
                <option value="Staff Manager">Employee Manager</option>
                <option value="UserManager">UserManager</option>
                <option value="Inventory Manager">Inventory Manager</option>
                <option value="Order Manager">Order Manager</option>
                <option value="Service Manager">Service Manager</option>
                <option value="Qulity Manager">Qulity Manager</option>

                
            </select><br></br>

            <lable style={{marginRight:'auto' , color:'#167CCC' , paddingLeft:'3px',  fontWeight: 'bold'}}>Password :</lable>
            <input type='text' placeholder='Password' name='password' required value={password} onChange={handleInputChange}/><br></br>

            <lable style={{marginRight:'auto' , color:'#167CCC' , paddingLeft:'3px',  fontWeight: 'bold'}}>Conform Password :</lable>
            <input type='text' placeholder='Conform Password' name='password2' required value={password2} onChange={handleInputChange}/><br></br>
            <button
              type='submit'
              style={{
                margin: '10px 0',
                padding: '10px 20px',
                background: '#0074D9', // Background color
                color: 'white',       // Text color
                borderRadius: '25px 0px 25px 0px',   // Border radius
                border: 'none',       // Remove border
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >Register</button>
            
          </form>
          </div>
          
          </div>
    </div>
          </div>
  )
}

export default Stfregister
