import React , {useEffect, useState} from 'react'
import AdminLayout from '../../../../components/DelivaryComp/adminLayout/AdminLayout'
import swal from 'sweetalert2';
import { userRequest } from '../../../../requestMethods';
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
			<div className="add-vehicle-container" style={{ marginTop: '50px', textAlign: 'center' }}>
    <form
        className="form-container"
        onSubmit={updateVehicleFormHandler}
        style={{
            height: 'auto',
            width: '80%',
            margin: '0 auto',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f4f4f4',
        }}
    >
        <div style={{  width: '100%' }}>
            <div style={{ }}>
                <span className="input-title" style={{ textAlign: 'right', marginRight: '10px' }}>
                    Owner/Company Name:
                </span>
                <input
                    className="input-field"
                    value={vehicle.name}
                    onChange={updateVehicleInputHandler}
                    name="name"
                    style={{  }}
                />
            </div>
            <div style={{}}>
                <span className="input-title" style={{ textAlign: 'right', marginRight: '10px' }}>
                    NIC Number:
                </span>
                <input
                    className="input-field"
                    value={vehicle.nic}
                    onChange={updateVehicleInputHandler}
                    name="nic"
                    style={{  }}
                />
            </div>
            <div style={{  }}>
                <span className="input-title" style={{ textAlign: 'right', marginRight: '10px' }}>
                    Address:
                </span>
                <textarea
                    className="input-textarea"
                    cols="30"
                    rows="5"
                    value={vehicle.address}
                    onChange={updateVehicleInputHandler}
                    name="address"
                    style={{ padding: '10px' }}
                ></textarea>
            </div>
            <div style={{ }}>
                <span className="input-title" style={{ textAlign: 'right', marginRight: '10px' }}>
                    Contact No:
                </span>
                <input
                    className="input-field"
                    value={vehicle.phone}
                    onChange={updateVehicleInputHandler}
                    name="phone"
                    style={{ flex: '2', padding: '10px' }}
                />
            </div>
        </div>

            <div style={{ }}>
                <span className="input-title" style={{textAlign: 'right', marginRight: '10px' }}>
                    Vehicle Registration Number:
                </span>
                <input
                    className="input-field"
                    value={vehicle.vehicleRegNum}
                    onChange={updateVehicleInputHandler}
                    name="vehicleRegNum"
                    style={{ padding: '10px' }}
                />
            </div>
            <div style={{  }}>
                <span className="input-title" style={{  textAlign: 'right', marginRight: '10px' }}>
                    Vehicle Model:
                </span>
                <select
                    className="input-field"
                    value={vehicle.model}
                    onChange={updateVehicleInputHandler}
                    name="model"
                    style={{  padding: '10px' }}
                >
                    <option className="select-option" value=""></option>
                    <option className="select-option" value="Lorry">
                        Lorry
                    </option>
                    <option className="select-option" value="Van">
                        Van
                    </option>
                </select>
            </div>
            <div style={{  }}>
                <span className="input-title" style={{  textAlign: 'right', marginRight: '10px' }}>
                    Vehicle Capacity:
                </span>
                <select
                    className="input-field"
                    value={vehicle.capacity}
                    onChange={updateVehicleInputHandler}
                    name="capacity"
                    style={{ flex: '2', padding: '10px' }}
                >
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
            </div>
        

        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <button onClick={navigateBackBtn} className="reset-btn" style={{ padding: '10px 20px', fontSize: '16px' }}>
                Back
            </button>
            <button type="submit" className="submit-btn" style={{ padding: '10px 20px', fontSize: '16px' }}>
                Update
            </button>
        </div>
    </form>
</div>

		</AdminLayout>
	);  
}

export default UpdateVehicle