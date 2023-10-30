import React, { useState } from "react";
import AdminLayout from "../../../../components/DelivaryComp/adminLayout/AdminLayout";
import "./Addvehicle.scss";
import { userRequest } from '../../../../requestMethods';
import swal from "sweetalert2";


function RegisterVehicle() {

	
	const [vehicle, setVehicle] = useState({
		name: "",
		nic: "",
		address: "",
		phone: "",
		vehicleRegNum: "",
		model: "",
		capacity: "",
	});

	const formHandler = (event) => {
		event.preventDefault();
		if (vehicle.name !== "") {
			console.log(vehicle);
			userRequest.post("/vehicles", vehicle).then((response) => {
				console.log(response.data);
				console.log("vehicle added successfully");
			});
			ResetForm();
			swal.fire({
				icon: "success",
				title: "Operation Successful",
				text: "vehicle added Successfully",
			});
		} else {
			console.log(vehicle);
			userRequest.post("/vehicles", vehicle).then((response) => {
				console.log(response.data);
				console.log("unsuccesfull");
			});
			ResetForm();
			swal.fire({
				icon: "error",
				title: "Operation Unsuccessful",
				text: "Vehicle registration failed",
			});
		}
	};

	const ResetForm = () => {
		setVehicle({
			name: "",
		  nic: "",
		  address: "",
		  phone: "",
		  vehicleRegNum: "",
		  model: "",
		  capacity: "",
		});
	};

	const handleInputChange = (event) => {
		setVehicle({
			...vehicle,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<AdminLayout>
			{/* <div className="add-vehicle-container1"> */}
				<form 
					className="form-container1"
					onSubmit={formHandler}
					style={{width:'1200px', height:'1500px'}}
				>
					{/* column lane one */}
					<div className="add-vehicle-column1" >
						<section className="input-container1">
							<span className="input-title1"style={{
    fontSize: '18px', // Set the font size to 18 pixels
    color: '#0074D9', // Set the text color to blue (#0074D9)
  }}>Owner/Company Name:</span>
							<input
								className="input-field1"
								value={vehicle.name}
								onChange={handleInputChange}
								name="name"
							/>
						</section>
						<section className="input-container1">
							<span className="input-title1"style={{
    fontSize: '18px', // Set the font size to 18 pixels
    color: '#0074D9', // Set the text color to blue (#0074D9)
  }}>NIC Number:</span>
							<input
								className="input-field1"
								value={vehicle.nic}
								onChange={handleInputChange}
								name="nic"
							/>
						</section>
						<section className="input-container1">
							<span className="input-title1" style={{
    fontSize: '18px', // Set the font size to 18 pixels
    color: '#0074D9', // Set the text color to blue (#0074D9)
  }}>
								Address:
							</span>
							<textarea
								className="input-textarea1"
								id=""
								cols="30"
								rows="10"
								value={vehicle.address}
								onChange={handleInputChange}
								name="address"
							></textarea>
						</section>
						<section className="input-container1">
							<span className="input-title1" style={{
    fontSize: '18px', // Set the font size to 18 pixels
    color: '#0074D9', // Set the text color to blue (#0074D9)
  }}>
								Contact No:
							</span>
							<input
								className="input-field1"
								value={vehicle.phone}
								onChange={handleInputChange}
								name="phone"
							/>
						</section>
					{/* </div> */}
					{/* column lane two */}
					{/* <div className="add-vehicle-column1"> */}
						<section className="input-container1">
							<span className="input-title1" style={{
    fontSize: '18px', // Set the font size to 18 pixels
    color: '#0074D9', // Set the text color to blue (#0074D9)
  }}>
								Vehicle Registration Number:
							</span>
							<input
								className="input-field1"
								value={vehicle.vehicleRegNum}
								onChange={handleInputChange}
								name="vehicleRegNum"
							/>
						</section>
						<section className="input-container1">
							<span className="input-title1" style={{
    fontSize: '18px', // Set the font size to 18 pixels
    color: '#0074D9', // Set the text color to blue (#0074D9)
  }}>vehicle Model:</span>
							<select
								className="input-field1"
								value={vehicle.model}
								onChange={handleInputChange}
								name="model"
							>
								{" "}
								<option className="select-option1" value=""></option>
								<option className="select-option1" value="Lorry">
									Lorry
								</option>
								<option className="select-option1" value="Van">
									Van
								</option>
							</select>
						</section>
            <section className="input-container1">
							<span className="input-title1" style={{
    fontSize: '18px', // Set the font size to 18 pixels
    color: '#0074D9', // Set the text color to blue (#0074D9)
  }}>vehicle Capacity:</span>
							<select
								className="input-field1"
								value={vehicle.capacity}
								onChange={handleInputChange}
								name="capacity"
							>
								{" "}
								<option className="select-option1" value=""></option>
								<option className="select-option1" value="3500Kg">
                  3500Kg
								</option>
								<option className="select-option1" value="3500-17000Kg">
                  3500-17000Kg
								</option>
                <option className="select-option1" value="17000-36000Kg">
                  17000-36000Kg
								</option>
							</select>
						</section>
						<div className="btn-container-add-vehicle1">
							<button
								onClick={() => {
									ResetForm();
								}}
                
								className="cancel-btn1"
							>
								Cancel
							</button>
							<button type="submit" className="submit-btn1">
								Add
							</button>
						</div>
					</div>
				</form>
			{/* </div> */}
		</AdminLayout>
	);
}

export default RegisterVehicle;
