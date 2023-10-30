import React, { useEffect, useState } from 'react';
import { AiFillEye, AiTwotoneCiCircle, AiOutlineSearch } from 'react-icons/ai';
import { getremoveUser } from '../../services/authService';
import './accessControl.scss';


import { saveAs } from 'file-saver';

const RemovedUser = () => {
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    async function getUserData() {
      const data = await getremoveUser();
      setUsers(data);
    }
    getUserData();
  }, []);

  const downloadUserData = () => {
    // Ensure you have users data
    if (users) {
      const userCSV = users
        .map(
          (user) =>
            `${user.ID},${user.Email},${user.name},${user.UserRole},${user.deletedAt}`
        )
        .join('\n');
      const blob = new Blob([`User ID,Email,Name,User role,Deactivate date\n${userCSV}`], {
        type: 'text/csv;charset=utf-8',
      });
      saveAs(blob, 'user_data.csv');
    }
  };

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user._id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="contallcontainer">
        <center><h2>Deactivated users</h2></center>
        <div className="content" style={{ marginLeft:'10px',marginRight:'20px'}}>
        <div className="search-bar" style={{ width: '300px', display: 'flex',marginTop:'40px' }}>
          <input
            type="text"
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        </div >
          <table style={{ margin: '20px 10px' ,boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)', borderRadius: '8px'}}>
            <thead >
              <tr>
                <th>UserID</th>
                <th>Email</th>
                <th>Name</th>
                <th>User role</th>
                <th>Deactivate date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.ID}</td>
                    <td>{user.Email}</td>
                    <td>{user.name}</td>
                    <td>{user.UserRole}</td>
                    <td>{new Date(user.deletedAt).toLocaleDateString(undefined, dateOptions)} {new Date(user.deletedAt).toLocaleTimeString(undefined, timeOptions)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No matching users found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            onClick={downloadUserData}
            style={{
              padding: '10px 20px',
              background: '#0074D9',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s',
              // marginLeft:'960px'
            }}
          >
            Download Remover User Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemovedUser;
