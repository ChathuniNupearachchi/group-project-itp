import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import { AllUser } from '../../services/authService';



const  UMDashbord =()=> {
  const [userCounts, setUserCounts] = useState({
    All:0,
    block:0,
    Drivers: 0,
    Customers: 0,
    UserManager: 0,
  });

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const users = await AllUser();
        // Assuming the response is an array of user objects
        // Count users based on their UserRole
        const counts = {
          All:users.length,
          block:users.filter(user=>user.ActiveStatus=== false).length,
          Drivers: users.filter(user => user.UserRole === 'Driver').length,
          Customers: users.filter(user => user.UserRole === 'Customer').length,
          UserManager: users.filter(user => user.UserRole === 'UserManager').length,
        };
        setUserCounts(counts);
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    fetchUserCounts();
  }, []);

 
  return (
    <div >
      <div><Header/></div>
      <Sidebar/>

      <div style={{ flex: '1', padding: '20px' ,marginLeft: '330px'}} >
      <h2 style={{textAlign:'center',paddingLeft:'50px',paddingRight:'50px' ,paddingTop:'20px', fontSize: '40px', color: '#056485'}}>User Counts<hr></hr></h2>
    <center><br></br>
      
    </center>
  </div>
  
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' ,marginLeft: '330px'}}>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '10px',
      width: '30%',
      borderRadius: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <div style={{ backgroundColor: '#0985E8', padding: '10px', borderRadius: '30px 0px 30px 0' }}>
      <div style={{ fontSize: '32px' ,color:'white',textAlign:'center'}}>All Users</div><hr></hr>
      <div style={{ fontSize: '32px' ,color:'white',textAlign:'center'}}>{userCounts.All}</div>
    </div>
  </div>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '10px',
      width: '30%',
      borderRadius: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <div style={{ backgroundColor: '#CBCBCB', padding: '10px',borderRadius: '30px 0px 30px 0' }}>
      <div style={{ fontSize: '32px' ,color:'black',textAlign:'center'}}>Drivers</div><hr></hr>
      <div style={{ fontSize: '32px', color:'black',textAlign:'center' }}>{userCounts.Drivers}</div>
    </div>
  </div>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '10px',
      width: '30%',
      borderRadius: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <div style={{ backgroundColor: '#E51818', padding: '10px', borderRadius: '30px 0px 30px 0'}}>
      <div style={{ fontSize: '32px' ,color:'white',textAlign:'center' }}>Customers</div><hr></hr>
      <div style={{ fontSize: '32px' ,color:'white',textAlign:'center' }}>{userCounts.Customers}</div>
    </div>
  </div>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '10px',
      width: '30%',
      borderRadius: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <div style={{ backgroundColor: '#50E306', padding: '10px' , borderRadius: '30px 0px 30px 0'}}>
      <div style={{ fontSize: '32px' ,color:'black',textAlign:'center' }}>User Managers</div><hr></hr>
      <div style={{ fontSize: '32px' ,color:'black',textAlign:'center' }}>{userCounts.UserManager}</div>
    </div>
  </div>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '10px',
      width: '30%',
      borderRadius: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <div style={{ backgroundColor: '#0FCAB9', padding: '10px', borderRadius: '30px 0px 30px 0' }}>
      <div style={{ fontSize: '32px' ,color:'black',textAlign:'center' }}>Block Users</div><hr></hr>
      <div style={{ fontSize: '32px' ,color:'black',textAlign:'center' }}>{userCounts.block}</div>
    </div>
  </div>
</div>

      
    </div>
  )
}

export default UMDashbord
