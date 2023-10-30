import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';



const initialState = {
    password: "",
    password2: "",
  };

const Reset = () => {
    const [formData, setformData] = useState(initialState);
    const { password, password2 } = formData;

    const {resetToken} =useParams()


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
      };

    const reset = async (e) =>{
        e.preventDefault()

        if(password.length<6){
            return toast.error("Password must be up to 6 charactor")
        }

        if(password!==password2){
            return toast.error("Conform password does not match!")
        }


        const userData = {
            password,
            password2,
          };

          try{
            const data = await resetPassword(userData,resetToken)
            toast.success(data.message)

          }catch(error){

            console.log(error.message);
          }
    }


  return (
    <div>
        <h2>Reset your password</h2>
        <form onSubmit={reset}>
            <input type='password' placeholder='New password' required name='password' value={password} onChange={handleInputChange}/><br/>
            <input type='password' placeholder='Conform password' required name='password2' value={password2} onChange={handleInputChange}/>
            <button type="submit">Reset Password</button>
        </form>
      
    </div>
  )
}

export default Reset
