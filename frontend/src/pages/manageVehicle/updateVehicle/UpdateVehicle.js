import React , {useEffect, useState} from 'react'
import AdminLayout from '../../../components/adminLayout/AdminLayout'
import swal from 'sweetalert2';
import { userRequest } from '../../../requestMethods';
import './UpdateVehicle.scss'
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateVehicle() {

    const navigate = useNavigate()
     const location = useLocation()
    const {id} = location.state || {};
    // console.log(id);

    const [vehicle, setVehicle] = useState({
      name: "",
      nic: "",
      address: "",
      phone: "",
      vehicleRegNum: "",
      model: "",
      capacity: "",
	});

  useEffect(()=>{
    if(id){
      userRequest.get(`/vehicles/mongo/${id}`).then((response)=>{
          setVehicle(response.data)
          console.log(vehicle);
      })
    }
  },[id])

	const updateVehicleFormHandler = (event) => {
		event.preventDefault();
		if (vehicle.name !== "") {
			console.log(vehicle);
			userRequest.put(`/vehicles/${id}`, vehicle).then((response) => {
				console.log(response.data);
				console.log("Updation successfull");
			});
			swal.fire({
				icon: "success",
				title: "Operation Successful",
				text: "Vehicle details updated succeessfully",
			});

            navigateBackBtn()
		} else {
			console.log(vehicle);
			userRequest.post("/vehicles", vehicle).then((response) => {
				console.log(response.data);
				console.log("success");
			});
			swal.fire({
				icon: "error",
				title: "Operation Unsuccessful",
				text: "Please fill relevant fields",
			});
		}
	};

	const navigateBackBtn = () => {
        navigate(`/view-vehicle`);
    }

	const updateVehicleInputHandler = (event) => {
    if (event.target.name === 'address' || event.target.name === 'phone'){
		setVehicle({
			...vehicle,
			[event.target.name]: event.target.value,
		});
  }
	};

    return (
		<AdminLayout>
			<div className="add-vehicle-container">
				<form
					className="form-container"
					onSubmit={updateVehicleFormHandler}
				>
					{/* column lane one */}
					<div className="add-vehicle-column">
						<section className="input-container">
							<span className="input-title">Owner/Company Name:</span>
							<input
								className="input-field"
								value={vehicle.name}
								onChange={updateVehicleInputHandler}
								name="name"
                readOnly
							/>
						</section>
						<section className="input-container">
							<span className="input-title">NIC Number:</span>
							<input
								className="input-field"
								value={vehicle.nic}
								onChange={updateVehicleInputHandler}
								name="nic"
                readOnly
							/>
						</section>
						<section className="input-container">
							<span className="input-title">
                Address:
							</span>
							<textarea
								className="input-textarea"
								id=""
								cols="30"
								rows="10"
								value={vehicle.address}
								onChange={updateVehicleInputHandler}
								name="address"
							></textarea>
						</section>
						<section className="input-container">
							<span className="input-title">
                Contact No:
							</span>
							<input
								className="input-field"
								value={vehicle.phone}
								onChange={updateVehicleInputHandler}
								name="phone"
							/>
						</section>
					</div>
					{/* column lane two */}
					<div className="add-vehicle-column">
						<section className="input-container">
							<span className="input-title">
                Vehicle Registration Number:
							</span>
							<input
								className="input-field"
								value={vehicle.vehicleRegNum}
								onChange={updateVehicleInputHandler}
								name="vehicleRegNum"
                readOnly
							/>
						</section>
            <section className="input-container">
							<span className="input-title">vehicle Model:</span>
							<select
								className="input-field"
								value={vehicle.model}
								onChange={updateVehicleInputHandler}
								name="model"
                readOnly
							>
								{" "}
								<option className="select-option" value=""></option>
								<option className="select-option" value="Lorry">
									Lorry
								</option>
								<option className="select-option" value="Van">
									Van
								</option>
							</select>
						</section>
            <section className="input-container">
							<span className="input-title">vehicle Capacity:</span>
							<select
								className="input-field"
								value={vehicle.capacity}
								onChange={updateVehicleInputHandler}
								name="capacity"
                readOnly
							>
								{" "}
								<option className="select-option" value=""></option>
								<option className="select-option" value="3500Kg">
                  3500Kg
								</option>
								<option className="select-option" value="3500-17000Kg">
                  3500-17000Kg
								</option>
                <option className="select-option" value="17000-36000Kg">
                  17000-36000Kg
								</option>
							</select>
						</section>
						<div className="btn-container-add-vehicle">
							<button
								onClick={() => {
									navigateBackBtn()
								}}
								className="reset-btn"
							>
								Back
							</button>
							<button type="submit" className="submit-btn">
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);  
}

export default UpdateVehicle