/*import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/Appcontext";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import SidebarItems from "./SidebarItem"

import { IoIosArrowForward } from "react-icons/io";


function SideBar() {

	const {stateTrack , setStateTrack} = useContext(AppContext)
	const [selected, setSelected] = useState(null);
	// const [selectedMain, setMain] = useState(0);

	useEffect(() => {
		eventTransformer(stateTrack);
	}, []);

	const eventTransformer = (num) => {
		setStateTrack(num);
		setSelected(0);
	};*/

	//return (
		//<div className="sidebar-container">
			//{/* brandname modifications central petcare */}
			//<div className="brandName">
				//Arrow Computers
			//</div>
			//{/* side menu items container */}
			/*<div className="side-bar-item-container">
				{ SidebarItems.map((item, index) => {
					const { id, icon, text, nestedFunctions } = item;

					return (
						<div key={index}>
							<div className="mainFunctionAssets" key={id}>
								<span className="mainFunction">
									<span className="functionPrompt">
										<span className="mainFuncIcon">
											{icon}
										</span>
										<span
											className="mainFuncItemName"
											onClick={() => {
												eventTransformer(index);
												console.log(index);
											}}
										>
											{text}
										</span>
										<span
											className={`scrollFuncIcon ${
												index === stateTrack &&
												"scroll-function-show"
											}`}
										>
											<IoIosArrowForward />
										</span>
									</span>

									<div
										className={`nested-function-container${
											index === stateTrack
												? "cont-show"
												: ""
										}`}
									>
										{nestedFunctions.map(
											(nestedFunction, index) => {
												const {
													link,
													nestedItemicon,
													nestedItemtext,
												} = nestedFunction;

												return (
													<NavLink key={index}
														to={link}
														className={({
															isActive,
														}) =>
															isActive
																? "active-nested-item"
																: "side-bar-nested-item"
														}
													>
														<span className="icon">
															{nestedItemicon}
														</span>
														<span className="item-name">
															{nestedItemtext}
														</span>
													</NavLink>
												);
											}
										)}
									</div>
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SideBar;*/
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { NavLink } from "react-router-dom";
import "./Inventorysidebar.scss";
import SidebarItems from "./InventorySidebarItem"

import { IoIosArrowForward } from "react-icons/io";

function SideBar() {
	const { stateTrack, setStateTrack } = useContext(AppContext);
	const [selected, setSelected] = useState(2000); // Set the initial selected item to Inventory Management ID

	useEffect(() => {
		eventTransformer(selected); // Pass selected instead of stateTrack
	}, [selected]); // Listen for changes in selected

	const eventTransformer = (num) => {
		setStateTrack(num);
		setSelected(num); // Set selected to the clicked item ID
	};

	return (
		<div className="Inventorysidebar-container" style={{ background: "linear-gradient(to right, #0D6BC2, #052646)" }}>
			<div className="InventorybrandName">
				Arrow Computers
			</div>
			<div className="Inventoryside-bar-item-container">
				{SidebarItems.map((item) => {
					const { id, icon, text, nestedFunctions } = item;
					return (
						<div key={id}>
							<div className="InventorymainFunctionAssets">
								<span className="InventorymainFunction">
									<span className="InventoryfunctionPrompt">
										<span className="InventorymainFuncIcon">
											{icon}
										</span>
										<span
											className="InventorymainFuncItemName"
											onClick={() => {
												eventTransformer(id); // Pass the item ID
												console.log(id);
											}}
										>
											{text}
										</span>
										<span
											className={`InventoryscrollFuncIcon ${
												id === selected && "Inventoryscroll-function-show"
											}`}
										>
											<IoIosArrowForward />
										</span>
									</span>

									<div
										className={`Inventorynested-function-container${
											id === selected ? "Inventorycont-show" : ""
										}`}
									>
										{nestedFunctions.map((nestedFunction) => {
											const {
												id: nestedItemId,
												link,
												nestedItemicon,
												nestedItemtext,
											} = nestedFunction;
											return (
												<NavLink key={nestedItemId}
													to={link}
													className={({
														isActive,
													}) =>
														isActive
															? "Inventoryactive-nested-item"
															: "Inventoryside-bar-nested-item"
													}
												>
													<span className="Inventoryicon">
														{nestedItemicon}
													</span>
													<span className="Inventoryitem-name">
														{nestedItemtext}
													</span>
												</NavLink>
											);
										})}
									</div>
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SideBar;

