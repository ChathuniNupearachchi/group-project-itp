import AdminLayout from "../../../components/inventoryComp/Inventorylayouts/InventoryAdminlayout";
import React, { useEffect, useState } from "react";
import "./managesingleItem.scss";
import {publicRequest} from "../../../InventoryrequestMethods";
import { useLocation  , useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import {AiOutlineDelete,AiOutlineEdit}   from "react-icons/ai";
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';



function ManageSingleItem() {
    
    
    const [isSubmitted, setIsSubmitted] = useState(false)

	
	const { id } = useParams();

	const [viewItem, setViewItem] = useState({});

	const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await publicRequest.get(`products/${id}`);
            setViewItem(response.data);
          } catch (error) {
            if (error.response && error.response.status === 404) {
              Swal.fire({
                title: 'Item Not Found',
                text: 'Could not find the item.',
                icon: 'error',
                confirmButtonText: 'OK'
              }).then(() => {
                navigate("/manage-item-page"); // Adjust this path accordingly
              });
            } else {
              console.error('Error fetching data:', error);
            }
          }
        };
    
        fetchData();
      }, [id, navigate]);

    console.log(viewItem);

    const handleDelete = (id) => {

        Swal.fire({
          title: 'Confirmation Needed',
          text: "Please confirm your action",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f44336', // Red color for confirm button
          cancelButtonColor: '#4caf50', // Green color for cancel button      
          confirmButtonText: 'Delete'
        }).then((result) => {
          if (result.isConfirmed) {
            publicRequest.delete(`products/${id}`)
            .then(res => {
                setIsSubmitted(!isSubmitted)
                toast.success('Product deleted')
            })
            .catch(err => {
              alert(err)
            })
          }
        })
        
      }

      
	const handleEditClick = (id) => {
        // Navigate to the update item page with the item's ID
        navigate(`/update-item-page/${id}`);
      };
     
    return (
        <AdminLayout>
          <div className="Inventoryview-inventory-item-container">
            <div className="Inventoryitem-details-container">
              <Col>
            <div className="Inventoryfield">
                <span className="Inventoryfield-name">Item Name:</span>
                <span className="Inventoryfield-value">{viewItem.name}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">SKU ID:</span>
                <span className="Inventoryfield-value">{viewItem.sku}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Category:</span>
                <span className="Inventoryfield-value">{viewItem.category}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Quantity:</span>
                <span className="Inventoryfield-value">{viewItem.quantity}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Unit Price:</span>
                <span className="Inventoryfield-value">Rs. {viewItem.price}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Value:</span>
                <span className="Inventoryfield-value">Rs. {viewItem.price*viewItem.quantity}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Location</span>
                <span className="Inventoryfield-value">{viewItem.location}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Description:</span>
                <span className="Inventoryfield-value">{viewItem.description}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Added to Inventory On:</span>
                <span className="Inventoryfield-value">{viewItem.createdAt}</span>
              </div>
              <div className="Inventoryfield">
                <span className="Inventoryfield-name">Last Update On:</span>
                <span className="Inventoryfield-value">{viewItem.updatedAt}</span>
              </div>
            
              <div className="Inventoryaction-buttons">
          <button className="btn btn-danger" onClick={() => {handleDelete(id)}}>
            <AiOutlineDelete /> Delete
          </button>
          <button className="btn btn-success" onClick={() => {handleEditClick(id)}}>
            <AiOutlineEdit /> Edit 
          </button>
        </div>
        </Col>
        </div>
        </div>
        </AdminLayout>
      );
}

export default ManageSingleItem;