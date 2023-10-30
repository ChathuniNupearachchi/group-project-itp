import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, getUser } from '../../services/authService'
import { SET_NAME, SET_USER } from '../../redux/fearures/auth/authSlice'
import { SpinnerIMg } from '../../components/loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import './profile.js'

const Profile = ()=> {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    const  [Profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        async function getUserData(){
            const data = await getUser()

            setProfile(data)
            setIsLoading(false)
            await dispatch(SET_USER(data))
            await dispatch(SET_NAME(data.name))


        }

        getUserData()
    },[dispatch] )


    const handleDeactivateAccount = async () => {
        const confirmDeactivate = window.confirm('Are you sure you want to deactivate your account?');
        if (confirmDeactivate) {
          try {
            await deleteUser(Profile?._id); // Assuming _id is the unique identifier for the user
            // Perform any additional cleanup or actions after successful deletion if needed
            navigate('/');
          } catch (error) {
            console.error('Error deactivating account:', error);
            // Handle the error, show a message to the user, or perform other actions as needed
          }
        }
      };


  return (
    <div className="profile-container">
        <div><Header/></div>
        <div><Sidebar/></div>
        {isLoading && <SpinnerIMg/>}
        <>
            {isLoading && Profile === null ? (
                <p>Somthig is wrong  pleace reload page....</p>

            ) : (
                <div className="profile-content" style={{marginLeft:'330px', marginRight:'0px',marginTop:'50px' }}>
                  <div className="newcontent" style={{ marginRight:'200px',marginTop:'50px'  }}>
                    <center>
                      
                       <img src={Profile?.photo} alt ="Profile picture" width="150" height="150"  style={{ boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)', borderRadius:'15px'}}/>
                       </center>
                    
                       <table style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',marginRight:'330px'}}>
                        <tbody>
                         <tr> <td>ID: </td><td> {Profile?._id} </td></tr>
                       <tr><td>Name:</td><td> {Profile?.name}</td> </tr>
                        <tr><td>Email:</td><td> {Profile?.Email} </td></tr>
                        <tr><td>Phone: </td><td>{Profile?.phone}</td> </tr>
                        <tr><td>User Type:</td><td> {Profile?.UserRole}</td></tr> 
                        </tbody>
                        </table>
                        
                        <div style={{
                          display: 'flex',
                          margin: '5px', // Add margin for spacing
                        }}>
                          <button style={{
                            backgroundColor: '#FF0000',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '20px 0 20px 0',
                            border: 'none',
                            textDecoration: 'none',
                            display: 'flex',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginLeft:'95px',
                            marginTop:'20px',
                            marginBottom:'30px',
                          }} onClick={handleDeactivateAccount}>
                            Deactivate Account
                          </button>

                          <button style={{
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '20px 0 20px 0',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop:'20px',
                            marginBottom:'30px',
                            marginLeft:'20px',
                          }}>
                            <Link to="/editProfile" style={{ color: '#fff', textDecoration: 'none' }}>
                              Edit Profile
                            </Link>
                          </button>
                        </div>
   
                        
                       
                    
                    </div>
                    </div>  
                
                

            )
        }
        </>

    </div>
  )
}

export default Profile 
