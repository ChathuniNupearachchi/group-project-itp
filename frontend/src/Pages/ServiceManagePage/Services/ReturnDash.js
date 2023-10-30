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
        const filteredData = allServiceData.filter(item => item.cType === "Return");
        setServiceData(filteredData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSentToInventory = () => {
    console.log('Item sent to inventory');
  };

  const handleDelete = (id) => {
    console.log(`Deleting item with ID: ${id}`);
  };

  const filteredServiceData = serviceData
    ? serviceData.filter(item =>
        item.productID.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <AdminLayout>
      <div className="return-dashboard-container">
        <div className="return-dashboard-header">
          <span className="tagline-add-service">Return Dashboard</span>
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
                      Swal.fire({
                        title: 'Do you need to send to Inventory?',
                        showCancelButton: true,
                        confirmButtonText: 'Confirm',
                        cancelButtonText: 'Cancel',
                        icon: 'question',
                      }).then(result => {
                        if (result.isConfirmed) {
                          handleSentToInventory();
                          Swal.fire('Sent to Inventory!', '', 'success');
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                          Swal.fire('Cancelled', '', 'error');
                        }
                      });
                    }}
                  >
                    Sent to Inventory
                  </button>
                  <span style={{ margin: '0 10px' }}></span>
                  <button
                    className="blue-button"
                    onClick={() => {
                      handleDelete(item.productID);
                      window.location.href = `mailto:${item.cusEmail}`;
                    }}
                  >
                    Chat
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
