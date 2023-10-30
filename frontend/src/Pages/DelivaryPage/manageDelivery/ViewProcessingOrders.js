import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../../components/DelivaryComp/adminLayout/AdminLayout";
import ResultContainer from "./GetOrderList";
import "./ViewProcessingOrders.scss";
import { userRequest } from '../../../requestMethods'

function ProcessingOrders() {
	const [order, setOrders] = useState([]);

	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
		userRequest.get("/delivaryorders").then((response) => {
			setOrders(response.data);
		});
	}, []);

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	const searchFunction = () => {
		userRequest.get(`/delivaryorders/${searchPrompt}`)
			.then((response) => {
				if (response.status === 200) {
					console.log(response);
					setOrders(response.data);
				} else {
					console.log("Order not found");
					setOrders([]);
				}
			})
			.catch((error) => {
				console.log("Driver not found");
				console.log(error);
			});
	};

	const searchFormHandler = (e) => {
		e.preventDefault();
		console.log(searchPrompt);
		searchFunction();
		setSearchPrompt("");
	};

	return (
		<AdminLayout>
			<div className="actionbar-container-manage-delivery">
				{/* main headline */}
				{/*Search bar*/}
				<div className="search-bar-container">
					<input
						type="text"
						className="search-field"
						placeholder="Search by order ID"
						value={searchPrompt}
						onChange={searchFieldHandler}
					/>
					<form onSubmit={searchFormHandler}>
						<button type="submit" className="search-btn">
							<ImSearch />
						</button>
						{/* <VehicleReport data={vehicle}/> */}
					</form>
				</div>

				{/* data fetching section including buttons*/}

				<div className="search-results-section">
					<h3>Orders to be processed</h3>
					<div className="delivery-info-item-head">
            <span className="item-field-head-manage-delivery">
              Order ID
						</span>
						<span className="item-field-head-manage-delivery">
							User ID
						</span>
						<span className="item-field-head-manage-delivery">
							Address
						</span>
            <span className="item-field-head-manage-delivery">
							City
						</span>
            <span className="item-field-head-manage-delivery">
							Postal Code
						</span>
						<span className="item-field-head-manage-delivery">
							Order Status
						</span>
						<span className="item-field-head-manage-delivery">
							Action
						</span>
						{/* <span className="item-field-head-manage-delivery">
							View Order
						</span> */}
					</div>
					{/* scrollable section */}

					<div className="search-results-container">
						{/* display the results */}
            <ResultContainer order={order} />
						{/* {vehicle.length === 0 ? 
            (
							// <NoItemsDisplayer />
						) : 
            (	)
            } */}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export default ProcessingOrders;
