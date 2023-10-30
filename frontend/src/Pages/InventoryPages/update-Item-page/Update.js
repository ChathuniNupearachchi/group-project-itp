import React, { useState ,useEffect} from "react";
import swal from "sweetalert2";
import AdminLayout from "../../../components/inventoryComp/Inventorylayouts/InventoryAdminlayout"
import { toast } from 'react-hot-toast';

import {publicRequest, userRequest} from '../../../InventoryrequestMethods';

import "./Inventoryupdateitem.scss";
import { useNavigate, useParams } from "react-router-dom";

function UpdateItem () {

    const { id } = useParams();

	const [viewItem, setViewItem] = useState({});

	const navigate = useNavigate()

    const [sku , setsku] = useState("")
	const[name, setitemName] =useState("")
	const[ category, setcategory] =useState("")
	const[ price, setprice] =useState("")
	const[ quantity, setquantity] =useState("")
	const[ description, setproductDescription] =useState("")
	const[location,setlocation]=useState("")
	
	// ... other state variables and functions
	//new
	function CalculateValue()
  {
	const Value = (price*quantity);
	return Value;
  }
	const [value,setvalue] = useState(CalculateValue());
    useEffect(() => {
        userRequest.get(`products/${id}`)
        .then(res => {
        
            setitemName(res.data.name)
            setsku(res.data.sku)
            setcategory(res.data.category)
            setprice(res.data.price)
            setquantity(res.data.quantity)
            setproductDescription(res.data.description)
			setlocation(res.data.location)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])
    

	console.log(viewItem);

    
	//const[ file, setFile] =useState(null)

	   
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await publicRequest.patch(`products/${id}`, {
        name,
        sku ,
        category ,
        
		quantity ,
		price ,
		value,
    
		location,
        description ,
      });

      // Optionally show a success message
      toast.success("Item updated successfully");

      // Redirect to a different route after successful update
      navigate("/manage-item-page");
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(viewItem);
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
			<div className="Inventoryadd-item-container-main">
				{/* this is the form container */}
				<form style={{height:'840px'}}
					className="Inventoryadd-item-form-container"
					onSubmit={handleSubmit}
				>
					<span className="Inventorytagline-add-item">
						Edit Item
					</span>
					{/* input field container */}
					<div className="Inventorycolumn-container">
						{/* column one */}
						<div className="Inventoryadd-item-column">
							<section className="Inventoryinput-container">
								<span className="Inventoryinput-title">item name</span>
								<input
									className="Inventoryinput-field"
									type='text'
									value={name}
									name="itemName"
									onChange={(e) => setitemName(e.target.value)} required/>
								
							</section>
							<section className="Inventoryinput-container">
								<span className="Inventoryinput-title">
									store keeping unit (SKU)
								</span>
								<input
									className="Inventoryinput-field"
									type='text'
									value={sku}
									name="sku"
									onChange={(e) => setsku(e.target.value)} readOnly required/>
								
							</section>
							<section className="Inventoryinput-container">
								<span className="Inventoryinput-title">category</span>
								<select
									className="Inventoryinput-field"
									name="category"
									value={category}
									onChange={(e) => setcategory(e.target.value)} required>
								
									<option
										className="Inventoryselect-option"
										value=""
									>Select Category ---</option>
									<option
										className="Inventoryselect-option"
										value="SSD"
									>
										SSD
									</option>
									<option
										className="Inventoryselect-option"
										value="TV"
									>
										TV
									</option>
									<option
										className="Inventoryselect-option"
										value="LapTop"
									>
										Lap Top
									</option>
									<option
										className="Inventoryselect-option"
										value="PC"
									>
										PC
									</option>
									<option
										className="Inventoryselect-option"
										value="Head Phone"
									>
										Head Phone

					
									</option>
									<option
										className="Inventoryselect-option"
										value="Mother Board"
									>
										Mother Board

					
									</option>
								</select>
							</section>
							
							<section className="Inventoryinput-container">
    <span className="Inventoryinput-title">Unit Price</span>
    <input
      className={`Inventoryinput-field ${isNumeric(price) ? '' : 'error'}`}
      type="text"
      value={price}
      name="price"
      onChange={(e) => setprice(allowOnlyNumbers(e.target.value))}
      required
    />
    {!isNumeric(price) && (
      <span className="Inventoryerror-message">Invalid entry. Please enter a valid numeric value.</span>
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
						<div className="Inventoryadd-item-column">
						<section className="Inventoryinput-container">
    <span className="Inventoryinput-title">Quantity</span>
    <input
      className={`Inventoryinput-field ${isNumeric(quantity) ? '' : 'error'}`}
      value={quantity}
      name="quantity"
      onChange={(e) => setquantity(allowOnlyNumbers(e.target.value))}
      required
    />
    {!isNumeric(quantity) && (
      <span className="Inventoryerror-message">Invalid entry. Please enter a valid numeric value.</span>
    )}
  </section>
  
							{/*new*/}
							<section className="Inventoryinput-container">
								<span className="Inventoryinput-title"> Value</span>
								<input
									className="Inventoryinput-field"
									value={quantity*price}
									name="value"
									onChange={(e) => setvalue(e.target.value)} readonly required/>
								
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
<section className="Inventoryinput-container">
								<span className="Inventoryinput-title">Location(Rack No)</span>
								<select
									className="Inventoryinput-field"
									name="location"
									value={location}
									onChange={(e) => setlocation(e.target.value)} required>
								
									<option
										className="Inventoryselect-option"
										value=""
									>Select Category ---</option>
									<option
										className="Inventoryselect-option"
										value="Rack 01"
									>
										Rack 01
									</option>
									<option
										className="Inventoryselect-option"
										value="Rack 02"
									>
										Rack 02
									</option>

									<option
										className="Inventoryselect-option"
										value="Rack 03"
									>
										Rack 03
									</option>
									<option
										className="Inventoryselect-option"
										value="Rack 04"
									>
										Rack 04
									</option>
									<option
										className="Inventoryselect-option"
										value="Rack 05"
									>
										Rack 05
									</option>
								</select>
							</section>
							<section className="Inventoryinput-container">
								<span className="Inventoryinput-title">
									product description
								</span>
								<textarea
									className="Inventoryinput-textarea"
									value={ description}
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
							<div className="Inventorybtn-container-add-item">
								<button type="submit" className="Inventorysubmit-btn" >
									Update
								</button>
								 
							</div>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
};

export default UpdateItem;
