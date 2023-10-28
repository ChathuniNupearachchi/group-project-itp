import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import AdminLayout from "../../../components/adminLayout/AdminLayout";
import ResultContainer from "./DisplayDeliveredList";
import "./DisplayDeliveredList.scss";
import { userRequest } from '../../../requestMethods'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CompletedDeliveries() {
	const [delivery, setDelivery] = useState([]);

	const [searchPrompt, setSearchPrompt] = useState("");

	useEffect(() => {
		userRequest.get("/orders/delivered").then((response) => {
			setDelivery(response.data);
		});
	}, []);

	const searchFieldHandler = (e) => {
		setSearchPrompt(e.target.value);
	};

	const searchFunction = () => {
		userRequest.get(`/orders/${searchPrompt}`)
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

	const generatePDFReport = () => {
    const doc = new jsPDF();

    // Set the report title and properties
    doc.text("Delivery Report", 10, 10);
    doc.setProperties({
        title: "Arrow computers - Delivery Report",
        author: "Senil Dimalka/Delivery manager",
    });

    // Check if delivery is an array or convert it to an empty array
    const data = Array.isArray(delivery) ? delivery : [];
    
    // Define column headers
    const headers = ["Order ID", "User ID", "Driver ID", "Vehicle Reg Num", "Dispatch Date", "Delivered Date", "Order Status"];

    // Extract data from the 'delivery' state
    const tableData = data.map((item) => [
        item._id,
        item.userID,
        item.assignedDriver.staffId,
        item.assignedVehicle.vehicleRegNum,
        item.departureDate,
        item.deliveredDate,
        item.OrderStatus,
    ]);

    // Add a table to the PDF using jspdf-autotable
    doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 20,
    });

    // Save the PDF with a unique name
    const pdfFileName = `delivery_report_${Date.now()}.pdf`;
    doc.save(pdfFileName);
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
						<button className="delivery-report-btn" onClick={generatePDFReport}>Generate PDF Report</button>
						{/* <VehicleReport data={vehicle}/> */}
					</form>
				</div>

				{/* data fetching section including buttons*/}

				<div className="search-results-section">
					<h3>Completed Delivery List</h3>
					<div className="de-info-item-head">
						<span className="item-field-head-manage-de">
							Order ID
						</span>
            <span className="item-field-head-manage-de">
							User ID
						</span>
            <span className="item-field-head-manage-de">
							Driver ID
						</span>
						<span className="item-field-head-manage-de">
							Vehicle Reg Num
						</span>
            <span className="item-field-head-manage-de">
							Dispatch Date
						</span>
            <span className="item-field-head-manage-de">
							Delivered Date
						</span>
						<span className="item-field-head-manage-de">
							Order Status
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

export default CompletedDeliveries;
