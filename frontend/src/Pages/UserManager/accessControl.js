import React, { useEffect, useState } from 'react';
import { AiFillEye, AiTwotoneCiCircle, AiOutlineSearch } from 'react-icons/ai';
import { AllUser } from '../../services/authService';
import './accessControl.scss';
import 'jspdf-autotable';

import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'; 
import headerImg from '../../assets/reportHeader.jpg';

const AccessControl = () => {
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getUserData() {
      const data = await AllUser();
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
            `${user.SID},${user.name},${user.Email},${
              user.ActiveStatus ? 'Active' : 'Inactive'
            }`
        )
        .join('\n');
      const blob = new Blob([`User ID,Name,Email,Active Status\n${userCSV}`], {
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
          user.SID.toLowerCase().includes(searchQuery.toLowerCase())||
          user.UserRole.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const downloadPDFReport = () => {
      if (users) {
        const doc = new jsPDF();
        const img = new Image();
        img.src = headerImg;
        img.onload = function () {

          const imgWidth = 100; // Width of the image
          const imgHeight = 50; // Height of the image
          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;

          // Calculate the center coordinates
          const imgX = (pageWidth - imgWidth) / 2;
          const imgY = (pageHeight - imgHeight - 40) / 2; // Adjust vertical position as needed
          const titleX = pageWidth / 2;
          const titleY = imgY + imgHeight + 10;

          doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);
          doc.setFontSize(18);
          doc.text('User Report', titleX, titleY, { align: 'center' });
          doc.autoTable({
            startY: titleY + 10,
            head: [['User ID', 'Email', 'User Role', 'Active Status']],
            body: users.map(user => [user.SID, user.Email, user.UserRole, user.ActiveStatus ? 'Active' : 'Inactive']),
          });
          doc.save('user_report.pdf');
        };
      }
    }
    

  return (
    <div>
      <div className="contallcontainer">
        <div className="content" style={{ marginLeft:'10px',marginRight:'20px'}}>
        <div className="search-bar" style={{ width: '300px', display: 'flex',marginTop:'40px',marginLeft:'10px' }}>
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
                <th>User ID</th>
                <th>Email</th>
                <th>User role</th>
                <th>Active status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.SID}</td>
                    <td>{user.Email}</td>
                    <td>{user.UserRole}</td>
                    <td>
                      {user.ActiveStatus ? (
                        <AiTwotoneCiCircle style={{ color: 'green' }} />
                      ) : (
                        <AiTwotoneCiCircle style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <Link to={`/Control-access/Userdetalis/${user._id}`}>
                        <AiFillEye />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No matching users found.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div
  style={{
    display: 'flex',
    alignItems: 'center', // Align items vertically in the center
  }}
>
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
    }}
  >
    Download (csv)
  </button>

  <button
        onClick={downloadPDFReport}
        style={{
          padding: '10px 20px',
          background: '#0074D9',
          color: 'white',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.3s',
          marginRight: '10px',
        }}
      >Download (pdf)</button>
  <button
    style={{
      padding: '10px 20px',
      background: '#0074D9',
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.3s',
      marginLeft: '600px', // Add some space between the buttons
    }}
  >
    <Link
      to="/RemovedUser"
      style={{
        color: 'white',
        textDecoration: 'none',
      }}
    >
      Removed User Details
    </Link>
  </button>
</div>


        </div>
      </div>
    </div>
  );
};

export default AccessControl;
