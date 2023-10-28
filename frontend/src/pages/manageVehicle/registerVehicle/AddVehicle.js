import React, { useState } from "react";
import AdminLayout from "../../../components/adminLayout/AdminLayout";
import "./Addvehicle.scss";
import { userRequest } from '../../../requestMethods';
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
			<div className="add-vehicle-container" style={{background:'#fff'}}>
				<form
					className="form-container-vehicle"
					onSubmit={formHandler}
				>
					{/* column lane one */}
					<div className="add-vehicle-column">
						<section className="vehicle-input-container">
							<span className="vehicle-input-title">Owner/Company Name:</span>
							<input
								className="vehicle-input-field"
								value={vehicle.name}
								onChange={handleInputChange}
								name="name"
							/>
						</section>
						<section className="vehicle-input-container">
							<span className="vehicle-input-title">NIC Number:</span>
							<input
								className="vehicle-input-field"
								value={vehicle.nic}
								onChange={handleInputChange}
								name="nic"
							/>
						</section>
						<section className="vehicle-input-container">
							<span className="vehicle-input-title">
								Address:
							</span>
							<textarea
								className="vehicle-input-textares"
								id=""
								cols="30"
								rows="10"
								value={vehicle.address}
								onChange={handleInputChange}
								name="address"
							></textarea>
						</section>
						<section className="vehicle-input-container">
							<span className="vehicle-input-title">
								Contact No:
							</span>
							<input
								className="vehicle-input-field"
								value={vehicle.phone}
								onChange={handleInputChange}
								name="phone"
							/>
						</section>
					</div>
					{/* column lane two */}
					<div className="add-vehicle-column">
						<section className="vehicle-input-container">
							<span className="vehicle-input-title">
								Vehicle Registration Number:
							</span>
							<input
								className="vehicle-input-field"
								value={vehicle.vehicleRegNum}
								onChange={handleInputChange}
								name="vehicleRegNum"
							/>
						</section>
						<section className="vehicle-input-container">
							<span className="vehicle-input-title">vehicle Model:</span>
							<select
								className="vehicle-input-field"
								value={vehicle.model}
								onChange={handleInputChange}
								name="model"
							>
								{" "}
								<option className="vehicle-select-option" value=""></option>
								<option className="vehicle-select-option" value="Lorry">
									Lorry
								</option>
								<option className="vehicle-select-option" value="Van">
									Van
								</option>
							</select>
						</section>
            <section className="vehicle-input-container">
							<span className="vehicle-input-title">vehicle Capacity:</span>
							<select
								className="vehicle-input-field"
								value={vehicle.capacity}
								onChange={handleInputChange}
								name="capacity"
							>
								{" "}
								<option className="vehicle-select-option" value=""></option>
								<option className="vehicle-select-option" value="3500Kg">
                  3500Kg
								</option>
								<option className="vehicle-select-option" value="3500-17000Kg">
                  3500-17000Kg
								</option>
                <option className="vehicle-select-option" value="17000-36000Kg">
                  17000-36000Kg
								</option>
							</select>
						</section>
						<div className="btn-container-add-vehicle">
							<button
								onClick={() => {
									ResetForm();
								}}
                
								className="vehicle-cancel-btn"
							>
								Cancel
							</button>
							<button type="submit" className="vehicle-submit-btn">
								Add
							</button>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
}

export default RegisterVehicle;
