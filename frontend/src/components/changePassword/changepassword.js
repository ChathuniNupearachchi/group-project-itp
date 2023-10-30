import React, { useState } from 'react'
import "./changepassword.scss"
import { toast } from 'react-toastify'
import { changePassword } from '../../services/authService'
import Card from '../card/card'



const initialState ={
    oldPassword:"",
    password:"",
    password2:"",
}

export const Changepassword = () => {
    const [formData,setformData] = useState(initialState)
    const{oldPassword,password,password2} = formData
    
    const handleInputChange =(e) =>{
        const {name, value} = e.target;
        setformData({...formData,[name]:value})
    }

    const changePass = async(e) =>{
        e.preventDefault()

        if(password!==password2){
            return toast.error("Conform password do not match")
        }

        const formData = {
            oldPassword,
            password
        }

        const data= await changePassword(formData)
        toast.success("Password Updated")
    }


  return (
    <div className='change-passwoed'>
        <Card >
        <br></br>
            <center>
            <h1 style={{color:'#FFA500'}}>Change Password<hr></hr></h1>
            <form onSubmit={changePass}>
                <br></br>
                <b style={{marginLeft:'0px',width:'700px'}}>Old Password :</b>
                <input type='text' name='oldPassword' value={oldPassword} placeholder='Old Password' onChange={handleInputChange}/><br></br> 
                <b style={{marginLeft:'0px',width:'700px'}}>New Password :</b>
                <input type='text' name='password' value={password} placeholder='New Password' onChange={handleInputChange}/> <br></br>
                <b style={{marginLeft:'0px',width:'700px'}}>Conform Password :</b>
                <input type='text' name='password2' value={password2} placeholder='Conform Password' onChange={handleInputChange}/> <br></br>
                <br></br>
                <button type='submit'>Change Password</button><br></br>
            </form>
            </center>

        </Card>
        </div>
    
  )
}
