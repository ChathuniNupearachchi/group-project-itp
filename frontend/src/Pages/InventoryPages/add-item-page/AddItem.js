import React, { useState } from "react";
import swal from "sweetalert2";
import AdminLayout from "../../../components/inventoryComp/Inventorylayouts/InventoryAdminlayout"
import { toast } from 'react-hot-toast';
import uploadImage from './uploadImage';
import {publicRequest, userRequest} from '../../../InventoryrequestMethods';

import useEffect  from 'react';


// import './firebase'
import "./InventoryaddItem.scss";

function AddItem () {

	 
	const[name, setitemName] =useState("")
	const[ category, setcategory] =useState("")
	const[ price, setprice] =useState("")
	const[ quantity, setquantity] =useState("")
	const[ description, setproductDescription] =useState("")
	const[location,setlocation]=useState("")
	//new
	const [sku, setsku] = useState(generateRandomSku());
  // ... other state variables and functions
  //new
  const [value,setvalue] = useState("");

  // Function to generate a random 4-digit SKU
  function generateRandomSku() {
    const randomSku = Math.floor(1000 + Math.random() * 9000);
    return 'ARROW'+randomSku.toString();
  }
  
  function calculateValue() {
    const cost = parseFloat(price) * parseFloat(quantity);
    return isNaN(cost) ? '' : cost.toFixed(2);
  }
  
  //new finish
	//const[ file, setFile] =useState(null)

	const handleReset = () => {

		setitemName('')
		setsku('')
		setcategory('')
		setprice('')
		setquantity('')
		setproductDescription('')
		setlocation('')
		setvalue('')
		//setFile(null)
		
		
	  }
	  const handleSubmit = async (e) => {
		e.preventDefault();
	  
		try {
			const calculatedValue = calculateValue();
		  const response = await publicRequest.post("/products", {
			name,
			sku,
			category,
			quantity,
			price,
			value: calculatedValue,
	        location,
			description,
		  });
	  
		  console.log('Response from server:', response.data);
		  toast.success('Item added');
		  handleReset();
		} catch (error) {
		  console.error('Failed to add item', error);
		  toast.error('Failed to add item');
		}
	  };
	  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
const allowOnlyNumbers = (value) => {
	const numericValue = value.replace(/[^0-9]/g, '');
	return numericValue;
  };

	  /*const handleSubmit = async (e) => {
		e.preventDefault()
	 
			publicRequest.post("", {
			  name,
			  sku,
			  category,
			  price,
			  quantity,
			  description,
			})
	  
			 .then(res => {

			  toast.success('Item added');
			  handleReset();
			} ).catch(err => {
			  toast.error('Failed to add item')
			})
		  }  */

	 

	 

	return (
		<AdminLayout>
			<div className="inventoryadd-item-container-main">
				<br/>
				<br/>
				<br/>
				<br/>
				{/* this is the form container */}
				<form style={{ height: '870px' }}
					className="inventoryadd-item-form-container"
					onSubmit={handleSubmit}
				>
					<span className="inventorytagline-add-item">
						Fill the form for add item
					</span>
					{/* input field container */}
					<div className="inventorycolumn-container">
						{/* column one */}
						<div className="inventoryadd-item-column">
							<section className="inventoryinput-container">
								<span className="inventoryinput-title">item name</span>
								<input
									className="inventoryinput-field"
									type='text'
									value={name}
									name="itemName"
									onChange={(e) => setitemName(e.target.value)} required/>
								
							</section>
							<section className="inventoryinput-container">
								<span className="inventoryinput-title">
									store keeping unit (SKU)
								</span>
								<input
									className="inventoryinput-field"
									type='text'
									value={sku}
									name="sku"
									onChange={(e) => setsku(e.target.value)} readOnly required/>
								
							</section>
							<section className="inventoryinput-container">
								<span className="inventoryinput-title">category</span>
								<select
									className="inventoryinput-field"
									name="category"
									value={category}
									onChange={(e) => setcategory(e.target.value)} required>
								
									<option
										className="inventoryselect-option"
										value=""
									>Select Category ---</option>
									<option
										className="inventoryselect-option"
										value="SSD"
									>
										SSD
									</option>
									<option
										className="inventoryselect-option"
										value="TV"
									>
										TV
									</option>
									<option
										className="inventoryselect-option"
										value="LapTop"
									>
										Lap Top
									</option>
									<option
										className="inventoryselect-option"
										value="PC"
									>
										PC
									</option>
									<option
										className="inventoryselect-option"
										value="Head Phone"
									>
										Head Phone

					
									</option>
									<option
										className="inventoryselect-option"
										value="Mother Board"
									>
										Mother Board

					
									</option>
								</select>
							</section>
							<section className="inventoryinput-container">
								<span className="inventoryinput-title">unit price</span>
								<input
									className="inventoryinput-field"
									type="text"
									value={price}
									name="price"
									onChange={(e) => setprice(e.target.value)} required/>
									 
									 {!isNumeric(price) && (
      <span className="inventoryerror-message">Invalid entry. Please enter a valid numeric value.</span>
    )}
							</section>
							{/*<section className="input-container">
								<span className="input-title">rack number</span>
								<input
									className="input-field"
									value={formData.rackNo}
									name="rackNo"
									onChange={addItemInputHandler}
								/>
	</section>*/}
						</div>
						{/* column two */}
						<div className="inventoryadd-item-column">
							<section className="inventoryinput-container">
								<span className="inventoryinput-title">quantity</span>
								<input
									className="inventoryinput-field"
									value={quantity}
									name="quantity"
									onChange={(e) => setquantity(e.target.value)} required/>
								{!isNumeric(quantity) && (
      <span className="inventoryerror-message">Invalid entry. Please enter a valid numeric value.</span>
    )}
							</section>
							{/*new*/}
							<section className="inventoryinput-container">
								<span className="inventoryinput-title"> Value</span>
								<input
									className="inventoryinput-field"
									value={calculateValue()}
									 
									readOnly  required/>
								
							</section>
							{/*<section className="input-container">
								<span className="input-title">
									manufacturer
								</span>
								<input
									className="input-field"
									value={formData.manufacturer}
									name="manufacturer"
									onChange={addItemInputHandler}
								/>
</section>*/}
                           <section className="inventoryinput-container">
								<span className="inventoryinput-title">Location:Rack No</span>
								<select
									className="inventoryinput-field"
									name="location"
									value={location}
									onChange={(e) => setlocation(e.target.value)} required>
								
									<option
										className="inventoryselect-option"
										value=""
									>Select Rack NO---</option>
									<option
										className="inventoryselect-option"
										value="Rack 01"
									>
										Rack 1
									</option>
									<option
										className="inventoryselect-option"
										value="Rack 2"
									>
										Rack 2
									</option>
									<option
										className="inventoryselect-option"
										value="Rack 3"
									>
										Rack 3
									</option>
									<option
										className="inventoryselect-option"
										value="Rack 4"
									>
										Rack 4
									</option>
									<option
										className="inventoryselect-option"
										value="Rack 5"
									>
										Rack 5
									</option>
								</select>
							</section>
							<section className="inventoryinput-container">
								<span className="inventoryinput-title">
									product description
								</span>
								<textarea
									className="inventoryinput-textarea"
									value={description}
									id=""
									cols="30"
									rows="10"
									name="productDescription"
									onChange={(e) => setproductDescription(e.target.value)} required>
									
								</textarea>
							</section>
							{/*<section className="input-container">
								<span className="input-title">
									product image
								</span>
								<input
									type="file"
									name="productImage"
									id="file-input"
									accept='.png, .jpeg, .jpg, .webp'
									className="input-field"
									onChange={(e) => setFile(e.target.files[0])}
								/>
</section>*/}
							<div className="inventorybtn-container-add-item">
								<button type="submit" className="inventorysubmit-btn" >
									Submit
								</button>
								<button type="reset" className="inventoryreset-btn" onClick={handleReset}>
									Reset
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
};

export default AddItem;
