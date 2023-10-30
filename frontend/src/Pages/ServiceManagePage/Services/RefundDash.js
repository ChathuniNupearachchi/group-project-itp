import React, { useEffect, useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { AllService } from '../../../services/authComplain';
import Swal from 'sweetalert2';

import './RefundDash.scss';

function ReturnDash() {
  const [serviceData, setServiceData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const allServiceData = await AllService();
        const filteredData = allServiceData.filter(item => item.cType === "Refund");
        setServiceData(filteredData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSentToRefund = () => {
    console.log('Item sent to refund');
  };

  const handleDelete = (id) => {
    console.log(`Deleting item with ID: ${id}`);
  };

  // Define a function to filter data based on the search query
  const filteredServiceData = serviceData
    ? serviceData.filter(item =>
        item.productID.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <AdminLayout>
      <div className="return-dashboard-container">
        <div className="return-dashboard-header">
          <span className="tagline-add-service">Refund Dashboard</span>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Product ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="blue-search-bar"
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Email</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredServiceData.map(item => (
              <tr key={item.productID}>
                <td>{item.productID}</td>
                <td>{item.cusEmail}</td>
                <td>{item.qty}</td>
                <td>
                  <button
                    className="blue-button"
                    onClick={() => {
                      // Show SweetAlert message
                      Swal.fire({
                        title: 'Do you need to send to Refund?',
                        showCancelButton: true,
                        confirmButtonText: 'Confirm',
                        cancelButtonText: 'Cancel',
                        icon: 'question',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          // Handle the confirmation action here
                          handleSentToRefund();
                          Swal.fire('Sent to Refund!', '', 'success');
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                          Swal.fire('Cancelled', '', 'error');
                        }
                      });
                    }}
                  >
                    Sent to Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default ReturnDash;
