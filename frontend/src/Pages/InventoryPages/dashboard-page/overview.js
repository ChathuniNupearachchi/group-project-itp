import React, { useState ,useEffect } from 'react'
import AdminLayout from "../../../components/inventoryComp/Inventorylayouts/InventoryAdminlayout"
 

import './overview.scss'

import {publicRequest, userRequest} from '../../../InventoryrequestMethods';
import toast from 'react-hot-toast'
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";

const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;
// This is the overview component. all the things related to this component goes here
function OverviewComponent() {


  // hooks and other data reading logics
  const [products, setProducts] = useState([]);

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

   

  let productCount = 0
  let TotalValue = 0

  products.map((product)=>{

     TotalValue=TotalValue+(product.price*product.quantity)

    if(Number(product.quantity) === 0){
      productCount++
    }


     
  })

  return (
    <AdminLayout>
    <div className="main-container">
      {/* this displays how many types of products are currently on the stock */}
        <div className="overall-report-bar">
            <div className="insight-card" style={{ backgroundColor: 'red' }}>
                
                <div className="insight-card-details">
                <BsCartX size={70} color="#fff" />
                  <span className="item-count-displayer">{productCount < 10 ? `0${productCount}` : productCount}</span>
                  <span className="insight-card-title">Out of stock</span>
                </div>
            </div>

            {/*<div className="insight-card">
                <img src={storeEquipment} alt="" className="insight-card-pic" />
                <div className="insight-card-details">
                  <span className="item-count-displayer">{petItemCount < 10 ? `0${petItemCount}` : petItemCount}</span>
                  <span className="insight-card-title">Pet Store Items</span>
                </div>
  </div>*/}

            <div className="insight-card" style={{ backgroundColor: 'green' }}>
                
                <div className="insight-card-details">
                <BsCart4 size={70} color="#fff" />
                  <span className="item-count-displayer">{products.length < 10 ? `0${products.length}` : products.length}</span>
                  <span className="insight-card-title">Total Products</span>
                </div>
            </div>

            <div className="insight-card" style={{ backgroundColor: 'darkblue' }}>
                
                <div className="insight-card-details">
                <AiFillDollarCircle size={70} color="#fff" />
                  <span className="item-count-displayer">Rs.{TotalValue < 10 ? `0${TotalValue}` : TotalValue}</span>
                  <span className="insight-card-title">Total Value</span>
                </div>
            </div>
             
        </div>

       {/* Runnnig on short displayer */}
        {/*<div className="row-heading">Limited Availability Items</div>
        <div className="second-row-container">
            <div className="running-short-item-head">
                  <span className="item-field-head">Item Name</span>
                  <span className="item-field-head">SKU</span>
                  <span className="item-field-head">Category</span>
                  <span className="item-field-head">Available Qty.</span>
                  <span className="item-field-head">Priority Level</span>
            </div>
          
            <div className="running-short-container">
                {
                  inventory.reverse().map((singleItem)=>{
                      const {_id, sku , itemName , category , price , rackNo , quantity , manufacturer} = singleItem
                      
                      if(Number(quantity) < 15){
                        return(
                        <div className="running-short-item" key={_id}>
                            <span className="item-field">{itemName}</span>
                            <span className="item-field">{sku}</span>
                            <span className="item-field">{category}</span>
                            <span className="item-field">{quantity}</span>
                            <span className="item-field">{quantity < 8 ? <PrLvHigh/> : <PrLvMed/>}</span>
                        </div>
                      )
                      }
                  }) 
                }
            </div>
            </div>*/}
    </div>
    </AdminLayout>
  )
}

export default OverviewComponent