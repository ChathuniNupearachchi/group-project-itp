import React , {useEffect, useState} from 'react'
import AdminLayout from '../../../components/DelivaryComp/adminLayout/AdminLayout'
import swal from 'sweetalert2';
import { userRequest } from '../../../requestMethods';
import './AssignDriverVehicle.scss'
import { useLocation, useNavigate } from 'react-router-dom';


function AssignToOrder() {

    const navigate = useNavigate()
    const location = useLocation()
    const {id} = location.state || {}
    // console.log(id);

	const [delivery, setDelivery] = useState({
    user: {},
    orderItems: [
      {
        name: '',
        qty: 0,
        image: '',
        price: 0.0,
        product: {},
      },
    ],
    shippingAddress: {
      address: '',
      city: '',
      distric: '',
      postalCode: '',
    },
    paymentMethod: '',
    paymentResult: {
      id: '',
      status: '',
      update_time: '',
      email_address: '',
    },
    itemsPrice: 0.0,
    taxPrice: 0.0,
    shippingPrice: 0.0,
    totalPrice: 0.0,
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    OrderStatus: '',
    // assignedDriver: {
    //   staffId: '',
    //   firstName: '',
    // },
    // assignedVehicle: {
    //   vehicleRegNum: '',
    // },
	});

	useEffect(()=>{
    if(id){
      userRequest.get(`/delivaryorders/${id}`).then((response)=>{
					setDelivery(response.data)
          console.log(delivery);
      })
    }
  },[id])

// 	useEffect(()=>{
// 		const getOrder = async() => {
// 	 userRequest.get(`/orders${id}`)
// 	 .then((response)=>{
// 		 console.log(response.data)
// 		 setDelivery(response.data)
// 		 console.log(delivery);
// 	 })
// 	 .catch((err) => {
// 		 console.log(err)
// 	 })
//  }
// if(id){
//  	getOrder()
// }
 
//  },[id, setDelivery])
	
	const updateOrderFormHandler = (event) => {
		event.preventDefault();
		if (delivery._id !== "") {
			console.log(delivery._id);
			userRequest.put(`/delivaryorders/${id}`, delivery).then((response) => {
				console.log(response.data);
				console.log("success");
			});
			swal.fire({
				icon: "success",
				title: "Operation Successful",
				text: "Driver and vehicle assigned",
			});

            navigateBackBtn()
		} else {
			console.log(delivery);
			userRequest.put("/delivaryorders", delivery).then((response) => {
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
        navigate(`/delivery-view-processing-orders`);
    }

	const updateOrderFormInputHandler = (event) => {
		setDelivery({
			...delivery,
			[event.target.name]: event.target.value,
		});
	};

    return (
		<AdminLayout>
			<h3 className='update-delivery-form-header'>Driver & Vehicle Assignation Form</h3> 
			<div className="update-order-container">
				
				<form
					className="form-container"
					onSubmit={updateOrderFormHandler}
				>
					{/* column lane one */}
					<div className="update-order-column">
						<section className="input-container">
							<span className="input-title">Order ID:</span>
							<input
								className="input-field"
								value={delivery._id}
								onChange={updateOrderFormInputHandler}
								name="_id"
                readOnly
							/>
						</section>
						<section className="input-container">
							<span className="input-title">Customer Name:</span>
							<input
								className="input-field"
								value={delivery.user?.name || ''}
								onChange={updateOrderFormInputHandler}
								name="user.name"
                readOnly
							/>
						</section>
            <section className="input-container">
							<span className="input-title">Shipping Address:</span>
							<input
								className="input-field"
								value={delivery.shippingAddress?.address || ''}
								onChange={updateOrderFormInputHandler}
								name="shippingAddress.address."
                readOnly
							/>
						</section>
            <section className="input-container">
							<span className="input-title">City:</span>
							<input
								className="input-field"
								value={delivery.shippingAddress?.city || ''}
								onChange={updateOrderFormInputHandler}
								name="shippingAddress.city."
                readOnly
							/>
						</section>
            <section className="input-container">
							<span className="input-title">Postal Code:</span>
							<input
								className="input-field"
								value={delivery.shippingAddress?.postalCode || ''}
								onChange={updateOrderFormInputHandler}
								name="shippingAddress.postalCode."
                readOnly
							/>
						</section>
					</div>

					{/* column lane two */}
					<div className="update-order-column">

            {/* {delivery.orderItems && delivery.orderItems.map((Item, index) =>(
              <div key={index}>
						<section className="input-container">
							<span className="input-title">
								Order Items:
							</span>
							<input
								className="input-field"
								value={Item.name}
								onChange={updateOrderFormInputHandler}
								name={`orderItems[${index}].name`}
                readOnly
							/>
						</section>
						<section className="input-container">
							<span className="input-title">
								Ordered Quantity:
							</span>
							<input
								className="input-field"
								value={Item.qty}
								onChange={updateOrderFormInputHandler}
								name={`orderItems[${index}].qty`}
                readOnly
							/>
						</section>
            </div>
            ))}; */}

            <section className="input-container">
							<span className="input-title">Driver ID:</span>
							<input
								className="input-field"
								value={delivery && delivery.assignedDriver && delivery.assignedDriver.staffId}
								onChange={updateOrderFormInputHandler}
								name="assignedDriver.staffId"
							/>
						</section>
            <section className="input-container">
							<span className="input-title">Driver Name:</span>
							<input
								className="input-field"
								value={delivery && delivery.assignedDriver && delivery.assignedDriver.firstName}
								onChange={updateOrderFormInputHandler}
								name="assignedDriver.firstName"
							/>
						</section>
            <section className="input-container">
							<span className="input-title">Vehicle Registration Number:</span>
							<input
								className="input-field"
								value={delivery && delivery.assignedVehicle && delivery.assignedVehicle.vehicleRegNum}
								onChange={updateOrderFormInputHandler}
								name="assignedVehicle.vehicleRegNum"
							/>
						</section>
						<section className="input-container">
							<span className="input-title">Order Status:</span>
							<select
								className="input-field"
								value={delivery.OrderStatus}
								onChange={updateOrderFormInputHandler}
								name="OrderStatus"
							>
								{" "}
								<option className="select-option" value=""></option>
								<option className="select-option" value="Delivering">
									Delivering
								</option>
								<option className="select-option" value="Delivered">
									Delivered
								</option>
							</select>
							{/* <input
								className="input-field"
								value={delivery.OrderStatus}
								onChange={updateOrderFormInputHandler}
								name="OrderStatus"
							/> */}
						</section>
						<div className="btn-container-update-order">
							<button
								onClick={() => {
									navigateBackBtn()
								}}
								className="reset-btn"
							>
								Back
							</button>
							<button type="submit" className="submit-btn">
								Assign
							</button>
						</div>
					</div>
				</form>
			</div>
		</AdminLayout>
	);  
}

export default AssignToOrder