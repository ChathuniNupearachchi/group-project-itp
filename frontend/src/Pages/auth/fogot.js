import React, { useState } from 'react'
import { forgotPassword, validateEmail } from '../../services/authService';
import { toast } from 'react-toastify';
import { RiFindReplaceLine } from 'react-icons/ri';

const Fogot = () =>{
    const [Email, setEmail] = useState("");

    const forgot = async(e) =>{
        e.preventDefault()

        if(!Email){
            return toast.error("Pleace enter Email")
        }
        if(!validateEmail(Email)){
            return toast.error("Enter valid email")
        }

        const userData= {
            Email,
        };

        await forgotPassword(userData)
        setEmail("")


    }

  return (
    <div className="forgetcontainer" style={{ background: 'rgb(221, 221, 221)', width: '100%', height: '100vh' }}>
      <br></br><br></br><br></br><br></br>
      <form
        onSubmit={forgot}
        style={{
          textAlign: 'center',
          marginTop:'100px', 
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          width: '700px',
          margin: '0 auto',
        }}
      >
        <RiFindReplaceLine size={35} color="#0073e6" /><br></br><br></br>
        <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
        <input
          placeholder='Email'
          required
          name='Email'
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
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
          }}
        >
          Get Reset Email
        </button>
      </form>
    </div>
  )
}

export default Fogot
