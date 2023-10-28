import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../../components/adminLayout/AdminLayout";
import ResultContainer from "./VehicleSearchList";
import "./VehicleFleet.scss";
import { userRequest } from '../../../requestMethods'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function VehicleFleet() {
	const [vehicle, setVehicle] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

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
    const filteredResults = vehicle.filter((item) =>
      item.vehicleRegNum.toLowerCase().includes(searchPrompt.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const searchFormHandler = (e) => {
    e.preventDefault();
    searchFunction();
  };



	// Define a function to generate a PDF report
	const generatePDFReport = () => {
		const doc = new jsPDF();

		// Set the report title and properties
		doc.text("Vehicle Fleet Report", 10, 10);
		doc.setProperties({
				title: "Arrow Computers - Vehicle Fleet Report",
				author: "Senil Dimalka/Delivery manager",
		});

		// Check if vehicle is an array or convert it to an empty array
		const data = Array.isArray(vehicle) ? vehicle : [];

		// Define column headers for the table
		const headers = ["Vehicle Reg Num", "Model", "Capacity", "Availability"];

		// Extract data from the 'vehicle' state
		const tableData = data.map((item) => [
				item.vehicleRegNum,
				item.model,
				item.capacity,
				item.availability,
		]);

		// Add a table to the PDF using jspdf-autotable
		doc.autoTable({
				head: [headers],
				body: tableData,
				startY: 20,
		});

		// Save the PDF with a unique name
		const pdfFileName = `vehicle_fleet_report_${Date.now()}.pdf`;
		doc.save(pdfFileName);
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
						<button className="generate-report-btn" onClick={generatePDFReport}>
                    Generate PDF Report
                </button>
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
