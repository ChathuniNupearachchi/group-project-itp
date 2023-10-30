import AdminLayout from "../../../components/inventoryComp/Inventorylayouts/InventoryAdminlayout";
import React, { useEffect, useState } from "react";
import "./view-items.scss";
import {publicRequest} from "../../../InventoryrequestMethods";
import { useLocation  , useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';


function ViewInventoryItem() {
	
	const { id } = useParams();

	const [viewItem, setViewItem] = useState({});

	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			await publicRequest.get(`products/${id}`).then(
				(response) => {
					setViewItem(response.data);
				},
				[setViewItem]
			);
		};

		fetchData();
	});

	console.log(viewItem);
    return (
        <AdminLayout>
      
          <div className="view-inventory-item-container">
            <div className="item-details-container">
              <Col>
              <div className="field">
                <span className="field-name">Item Name:</span>
                <span className="field-value">{viewItem.name}</span>
              </div>
              <div className="field">
                <span className="field-name">SKU ID:</span>
                <span className="field-value">{viewItem.sku}</span>
              </div>
              <div className="field">
                <span className="field-name">Category:</span>
                <span className="field-value">{viewItem.category}</span>
              </div>
              <div className="field">
                <span className="field-name">Quantity:</span>
                <span className="field-value">{viewItem.quantity}</span>
              </div>
              <div className="field">
                <span className="field-name">Unit Price:</span>
                <span className="field-value">Rs. {viewItem.price}</span>
              </div>
              <div className="field">
                <span className="field-name">Value:</span>
                <span className="field-value">Rs. {viewItem.price*viewItem.quantity}</span>
              </div>
              <div className="field">
                <span className="field-name">Location</span>
                <span className="field-value">{viewItem.location}</span>
              </div>
              <div className="field">
                <span className="field-name">Description:</span>
                <span className="field-value">{viewItem.description}</span>
              </div>
              <div className="field">
                <span className="field-name">Added to Inventory On:</span>
                <span className="field-value">{viewItem.createdAt}</span>
              </div>
              <div className="field">
                <span className="field-name">Last Update On:</span>
                <span className="field-value">{viewItem.updatedAt}</span>
              </div>
              </Col>
              <Col>
              <></>
              </Col>
            </div>
          </div>
        </AdminLayout>
      );
}

export default ViewInventoryItem;