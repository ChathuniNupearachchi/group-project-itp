import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import { userRequest } from '../../../../requestMethods'

export default function VehicleSearchResultsContainer(props) {
	const { vehicle } = props;
	const navigate = useNavigate();

	//update function
	const updateVehicle = (id) => {
		navigate(`/update-vehicle`, { state: { id } });
		console.log(id);
	};

  //delete function
	const deleteVehicle = (id) => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: "btn-success",
				cancelButton: "btn-danger",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "No, cancel!",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					swalWithBootstrapButtons.fire(
						"Deleted!",
						"Your file successfully deleted.",
						"success"
					);

					userRequest.delete(`/vehicles/${id}`)
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error);
						});

					const newSet = vehicle.filter((object) => {
						const { _id } = object;

						return _id !== id;
					});

					// console.log(newSet);
					// setFunc(newSet);
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					swalWithBootstrapButtons.fire(
						"Cancelled",
						"Delete operation canceled",
						"error"
					);
				}
			});
	};

	return (
		<div>
			{vehicle.reverse().map((singleVehicle) => {
				const {
					_id,
					vehicleRegNum,
					model,
					capacity,
					availability,
				} = singleVehicle;

				if (vehicle.length > 0) {
					return (
						<div className="vehicle-info" key={_id}>
							<span className="item-field-manage-vehicle">
								{vehicleRegNum}
							</span>
							<span className="item-field-manage-vehicle">
								{model}
							</span>
							<span className="item-field-manage-vehicle">
								{capacity}
							</span>
							<span className="item-field-manage-vehicle">
								{availability}
							</span>

							<span className="item-field-manage-vehicle">
								<button className="action-btns-manage-vehicle"
									onClick={() => updateVehicle(_id)}>
									<AiOutlineEye />
								</button>
								<button 
									className="action-btns-manage-vehicle"
									onClick={() => updateVehicle(_id)}>
									<BiEdit />
								</button>
								<button
									className="action-btns-manage-vehicle"
									onClick={() => deleteVehicle(_id)}
								>
									<AiOutlineDelete />
								</button>
							</span>
						</div>
					);
				}
			})}
		</div>
	);
}
