import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../../../components/DelivaryComp/adminLayout/AdminLayout";
import ResultContainer from "./DisplayDeliveryList";
import "./DisplayDeliveryList.scss";
import { userRequest } from '../../../../requestMethods'

function DeliveryList() {
	const [delivery, setDelivery] = useState([]);

	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
		userRequest.get("/delivaryorders/delivered").then((response) => {
			setDelivery(response.data);
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
					setDelivery(response.data);
				} else {
					console.log("Delivered delivery not available");
					setDelivery([]);
				}
			})
			.catch((error) => {
				console.log("Delivery not found");
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
			<div className="actionbar-container-manage-de">
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
					<h3>Delivery List</h3>
					<div className="de-info-item-head">
						<span className="item-field-head-manage-de">
							Order ID
						</span>
            <span className="item-field-head-manage-de">
							Driver ID
						</span>
						<span className="item-field-head-manage-de">
							Driver Name
						</span>
						<span className="item-field-head-manage-de">
							Vehicle Reg Num
						</span>
						<span className="item-field-head-manage-de">
							Order Status
						</span>
						<span className="item-field-head-manage-de">
							Action
						</span>

					</div>
					{/* scrollable section */}

					<div className="search-results-container">
						{/* display the results */}
            <ResultContainer delivery={delivery} />
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

export default DeliveryList;
