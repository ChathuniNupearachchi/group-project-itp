import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, getUser } from '../../services/authService'
import { SET_NAME, SET_USER } from '../../redux/fearures/auth/authSlice'
import { SpinnerIMg } from '../../components/loader/Loader'
import { Link, useNavigate } from 'react-router-dom'


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
        {isLoading && <SpinnerIMg/>}
        <>
            {isLoading && Profile === null ? (
                <p>Somthig is wrong  pleace reload page....</p>

            ) : (
                <div className="profile-content" style={{marginTop:'20px'}}>
                    <center>
                    <div>
                       <img src={Profile?.photo} alt ="Profile picture" width="150" height="150" />
                    </div>  
                    
                       <table>
                        <tbody>
                         <tr> <td>ID: </td><td> {Profile?._id} </td></tr>
                       <tr><td>Name:</td><td> {Profile?.name}</td> </tr>
                        <tr><td>Email:</td><td> {Profile?.Email} </td></tr>
                        <tr><td>Phone: </td><td>{Profile?.phone}</td> </tr>
                        <tr><td>User Type:</td><td> {Profile?.UserRole}</td></tr> 
                        </tbody>
                        </table>
                        
                        <div>
                        <button
  style={{
    padding: '10px 20px',
    background: '#28a745', // Green background color
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginTop:'10px'
  }}
>
  <Link
    to="/editProfile"
    style={{
      color: 'white',
      textDecoration: 'none',
    }}
  >
    Edit Profile
  </Link>
</button>


                        </div>
                        <br/>
                        
                        
                        <div>
                        <button
  onClick={handleDeactivateAccount}
  style={{
    padding: '10px 20px',
    background: '#FF4136', // Red background color
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginLeft: '10px', // Add some space to the left of the button
  }}
>
  Deactivate Account
</button>

                        </div>
                        
                        </center>
                    
                    </div>  
                
                

            )
        }
        </>

    </div>
  )
}

export default Profile 
