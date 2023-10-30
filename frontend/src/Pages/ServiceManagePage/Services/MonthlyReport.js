import React, { useState, useEffect } from "react";
import AdminLayout from '../Layouts/AdminLayout';
import { AllComplaints, ReturnsCount, RefundsCount, getRecentComplaints } from '../../../services/authComplain'; // Import the getRecentComplaints function
import { Link } from 'react-router-dom';
import './MonthlyReport.scss';



function MonthlyReport() {
  const [count, setCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);
  const [refundCount, setRefundCount] = useState(0);
  const [recentComplaints, setRecentComplaints] = useState([]);


  useEffect(() => {
    AllComplaints()
      .then(data => {
        setCount(data.count);
      })
      .catch(error => console.error('Error handling count:', error));
  
    ReturnsCount()
      .then(data => {
        setReturnCount(data);
      })
      .catch(error => console.error('Error handling return count:', error));
  
    RefundsCount()
      .then(data => {
        setRefundCount(data);
      })
      .catch(error => console.error('Error handling return count:', error));
  
    // Fetch recent complaints data and set it in the state
    getRecentComplaints()
      .then(data => {
        setRecentComplaints(data);
      })
      .catch(error => console.error('Error handling recent complaints:', error));
  }, []);
  

 



  return (
    <AdminLayout>
      <span className="tagline-add-service">Dashboard</span>
      <div className="monthly-report-container">
        <Link to="/admin/service/ManageServices" className="link-style"> 
          <div className="cardR">
            <h2>Monthly Complaints</h2>
            <p>Total Complaints: {count}</p> 
          </div>
        </Link>
        <Link to="/admin/service/ReturnDash" className="link-style">
          <div className="cardR1">
            <h2>Monthly Returns</h2>
            <p>Total Returns: {returnCount}</p>
          </div>
        </Link>
        <Link to="/admin/service/RefundDash" className="link-style">
          <div className="cardR2">
          <h2>Monthly Complaints</h2>
            <p>Total Refunds: {refundCount}</p>
          </div>
        </Link>
      </div>
      
      <div className="recent-complaints">
  <h2>Recent Complaints</h2>
  <table className="complaint-table">
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Customer ID</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {recentComplaints.map(complaint => (
        <tr key={complaint._id}>
          <td>{complaint.productID}</td>
          <td>{complaint.cusID}</td>
          <td>{complaint.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </AdminLayout>
  );
}

export default MonthlyReport;
