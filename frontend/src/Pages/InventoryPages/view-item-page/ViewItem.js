import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, FormControl } from 'react-bootstrap';
import { FaSearch, FaEdit } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { publicRequest } from '../../../InventoryrequestMethods';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/inventoryComp/Inventorylayouts/InventoryAdminlayout';
import './ViewItems.scss';
import {AiOutlineEye}   from "react-icons/ai";

function ManageItems() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get('/products');
        setProducts(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only on component mount

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className='container-shadow'>
        <Row className='align-items-center'>
          <Col>
          <h2 style={{ color: '#0047AB' }}>View Inventory</h2>
          </Col>
        </Row>

        


        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Value</th>
              <th>View Item</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>Rs. {product.price}</td>
                <td>Rs.{product.price*product.quantity}</td>
                <td>
                <LinkContainer to={`/view-singleitem-page/${product._id}`}>
    <Button variant='light' className='btn-sm mx-2'>
        <AiOutlineEye size={25} color={"navy blue"}/>
    </Button>
          </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
}

export default ManageItems;

                        
    
                                         
              
 