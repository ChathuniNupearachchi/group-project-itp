import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../../../components/DelivaryComp/adminLayout/AdminLayout";
import ResultContainer from "./VehicleSearchList";
import "./VehicleFleet.scss";
import { userRequest } from '../../../../requestMethods'

function VehicleFleet() {
	const [vehicle, setVehicle] = useState([]);

	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
		userRequest.get("/vehicles").then((response) => {
			setVehicle(response.data);
		});
	}, []);

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	const searchFunction = () => {
		userRequest.get(`/vehicles/${searchPrompt}`)
			.then((response) => {
				if (response.status === 200) {
					console.log(response);
					setVehicle(response.data);
				} else {
					console.log("Vehicle not found");
					setVehicle([]);
				}
			})
			.catch((error) => {
				console.log("Vehicle not found");
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
			<div className="actionbar-container-manage-vehicle">
				{/* main headline */}
				{/*Search bar*/}
				<div className="search-bar-container">
					<input
						type="text"
						className="search-field"
						placeholder="Search by vehicle reg num "
						value={searchPrompt}
						onChange={searchFieldHandler}
					/>
					<form onSubmit={searchFormHandler}>
						<button type="submit" className="search-btn">
							<ImSearch />
						</button>
						{/* <DriverReport data={vehicle}/> */}
					</form>
				</div>

				{/* data fetching section including buttons*/}

				<div className="search-results-section">
					{/* table headings */}
					<div className="vehicle-info-item-head">
						<span className="item-field-head-manage-vehicle">
							Vehicle Reg Num
						</span>
						<span className="item-field-head-manage-vehicle">
							Model
						</span>
						<span className="item-field-head-manage-vehicle">
							Capacity
						</span>
						<span className="item-field-head-manage-vehicle">
							Availability
						</span>
						<span className="item-field-head-manage-vehicle">
							Action
						</span>
				
					</div>
					{/* scrollable section */}

					<div className="search-results-container">
						{/* display the results */}
            <ResultContainer vehicle={vehicle} />
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

export default VehicleFleet;
