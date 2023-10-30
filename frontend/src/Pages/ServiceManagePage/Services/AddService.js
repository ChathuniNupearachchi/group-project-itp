import React, { useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import './AddService.scss';
import { userRequest } from '../../../requestMethodServiceManage';
import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify';

function AddService() {
  const [productID, setProductID] = useState("");
  const [cusID, setCusID] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const [qty, setQty] = useState("");
  const [file, setFile] = useState(null);
  const [cType, setCType] = useState("");
  const [description, setDescription] = useState(""); // Initialize with an empty string

  const handleReset = () => {
    setProductID('');
    setCusID('');
    setCusEmail('');
    setQty('');
    setFile(null);
    setCType('');
    setDescription('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // const imageURL = await uploadImage(file);
    userRequest
      .post("/api/services/addService", {
        productID,
        cusID,
        cusEmail,
        qty,
        file,
        cType,
        description,
      })
      .then((res) => {
        toast.success('Complaint added');
        handleReset();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <AdminLayout>
      <h3>ADD YOUR COMPLAINT HERE.....</h3><br></br><br></br>

      <div className="add-service-container-main">
        <form className="add-service-form-container" onSubmit={handleSubmit}>
          <span className="tagline-add-service">Complaint Form</span>
          <div className="column-container">
            <div className="add-service-column">
              <section className="input-container">
                <span className="input-title">Product ID</span>
                <input
                  type="text"
                  className="input-field"
                  value={productID}
                  onChange={(e) => setProductID(e.target.value)}
                  required
                />
              </section>
              <section className="input-container">
                <span className="input-title">Customer ID</span>
                <input
                  type="text"
                  className="input-field"
                  value={cusID}
                  onChange={(e) => setCusID(e.target.value)}
                  required
                />
              </section>
              <section className="input-container">
                <span className="input-title">Email Address</span>
                <input
                  type="email"
                  className="input-field"
                  value={cusEmail}
                  onChange={(e) => setCusEmail(e.target.value)}
                  required
                />
              </section>
              <section className="input-container">
                <span className="input-title">Quantity</span>
                <input
                  className="input-field"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </section>
              <section className="input-container">
                <span className="input-title">Product Image</span>
                <input
                  id="file-input"
                  type="file"
                  accept=".png, .jpeg, .jpg, .webp"
                  className="input-field"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </section>
              <section className="input-container">
                <span className="input-title">Complaint type</span>
                <select
                  className="input-field"
                  value={cType}
                  onChange={(e) => setCType(e.target.value)}
                  required
                >
                  <option value="Return">Return</option>
                  <option value="Refund">Refund</option>
                </select>
              </section>
              <section className="input-container">
                <span className="input-title">Description</span>
                <textarea
                  className="input-textarea"
                  cols="30"
                  rows="10"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>

              </section>
              <div className="btn-container-add-service">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button type="reset" className="reset-btn" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddService;
