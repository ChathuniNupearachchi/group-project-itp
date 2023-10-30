import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeActiveStatus, deleteUser, userById } from '../../services/authService'
import './userDetails.scss'

import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const  UserDetail =()=> {
    const navigate = useNavigate()
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [activeStatus, setActiveStatus] = useState(true);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    useEffect(() => {
        async function fetchUserDetails() {
          try {
            const userData = await userById(userId);
            console.log(userData)
            setUser(userData);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchUserDetails();
      }, [userId]);

      const handleSetActiveStatus = async () => {
        try {
          const response = await ChangeActiveStatus(userId);
          // Assuming the response contains the updated user object with the active status
          setActiveStatus(response.user.ActiveStatus);
          toast.success('Active Status toggled successfully!');
          window.location.reload();
        } catch (error) {
          console.error('Error toggling Active Status:', error);
        }
      };

      const handleRemoveUser = async () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this user!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, Deactivate it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteUser(userId);
              Swal.fire('Deleted!', 'User has been removed.', 'success');
              navigate('/Control-access');
              // Redirect to a different page after deletion if needed
            } catch (error) {
              console.error('Error removing user:', error);
              Swal.fire('Error!', 'Failed to remove user.', 'error');
            }
          }
        });
      };


      return(
    <div>
        <div className='container'>
          <div className='user-details'>
     
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>User ID: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.Email}</p>
          <p>Phone: {user.phone}</p>
          <p>Registred date: {new Date(user.createdAt).toLocaleDateString(undefined, dateOptions)} {new Date(user.createdAt).toLocaleTimeString(undefined, timeOptions)}</p>
          <p>User role: {user.UserRole}</p><br/>
          <p style={{ color: user.ActiveStatus ? 'green' : 'red', fontWeight: 'bold' }}>
            Activate state: {user.ActiveStatus ? 'Active' : 'Block'}
          </p>
          <center>
          <button onClick={handleSetActiveStatus}>{user.ActiveStatus ? 'Block' : 'Active'}</button><br/><br/>
          <button className='remove' onClick={handleRemoveUser}>Remove</button><br/><br/>
          </center>
          

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
        </div>
      
    </div>
      )
  
}

export default UserDetail
