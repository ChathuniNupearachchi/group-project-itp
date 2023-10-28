import React, { useEffect, useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { AllService } from '../../services/authComplain';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import './ReportPdf';
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

  const generateReport = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Initialize the report content
    let report = 'Refund Report\n\n';

    // Iterate over the filteredServiceData and append data to the report
    filteredServiceData.forEach((item, index) => {
      report += `Entry ${index + 1}:\n`;
      report += `Product ID: ${item.productID}\n`;
      report += `Email: ${item.cusEmail}\n`;
      report += `Quantity: ${item.qty}\n\n`;
    });

    // Add the report content to the PDF
    doc.text(report, 10, 10);

    // Save the PDF as "refund_report.pdf"
    doc.save('refund_report.pdf');
  };

  return (
    <AdminLayout>
      <div className="return-dashboard-container">
        <div className="return-dashboard-header">
          <span className="tagline-add-service">Refund Dashboard</span>
          <div className="header-buttons">
            <button className="blue-button generate-report-button" onClick={generateReport}>
              Generate Report (PDF)
            </button>
          </div>
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
