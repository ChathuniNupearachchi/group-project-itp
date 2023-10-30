import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../../components/DelivaryComp/adminLayout/AdminLayout";
import ResultContainer from "./DisplayDriverList";
import "./DriverList.scss";
import { userRequest } from '../../../requestMethods'

function DriverList() {
	const [driver, setDriver] = useState([]);

	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
		userRequest.get("/drivers").then((response) => {
			setDriver(response.data);
		});
	}, []);

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	const searchFunction = () => {
		userRequest.get(`/drivers/${searchPrompt}`)
			.then((response) => {
				if (response.status === 200) {
					console.log(response);
					setDriver(response.data);
				} else {
					console.log("Driver not found");
					setDriver([]);
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
			<div className="actionbar-container-manage-Driver">
				{/* main headline */}
				{/*Search bar*/}
				<div className="search-bar-container">
					<input
						type="text"
						className="search-field"
						placeholder="Search by Staff ID"
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
					<h3>Driver List</h3>
					<div className="driver-info-item-head">
						<span className="item-field-head-manage-driver">
							Staff ID
						</span>
						<span className="item-field-head-manage-driver">
							Driver Name
						</span>
						<span className="item-field-head-manage-driver">
							Contact Number
						</span>
						<span className="item-field-head-manage-driver">
							Availability
						</span>
						<span className="item-field-head-manage-driver">
							Action
						</span>
		
					</div>
					{/* scrollable section */}

					<div className="search-results-container">
						{/* display the results */}
            <ResultContainer driver={driver} />
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

export default DriverList;
