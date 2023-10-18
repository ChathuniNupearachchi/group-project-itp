import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { publicRequest } from "../../requestMethods";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import "./Manage-inventory.scss";
import { Col } from "react-bootstrap";

export default function ItemSearchResultsContainer(props) {
	const { inventory, setFunc } = props;
	const navigate = useNavigate();

	// view function
	const viewItem = (id) => {
		navigate("/manage-singleitem-page", { state: { id } });
	};

	// update function
	const updateItem = (id) => {
		navigate(``, { state: { id } });
		console.log(id);
	};

	// delete function
	const deleteItem = (deletingID) => {
		Swal.fire({
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
					Swal.fire(
						"Deleted!",
						"Your file has been deleted.",
						"success"
					);

					publicRequest.delete(``)
						.then((response) => {
							console.log(response);
						})
						.catch((error) => {
							console.log(error);
						});

					const newSet = inventory.filter((object) => {
						const { _id } = object;

						return _id !== deletingID;
					});

					console.log(newSet);
					setFunc(newSet);
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					Swal.fire(
						"Cancelled",
						"Your imaginary file is safe :)",
						"error"
					);
				}
			});
	};
	 

	return (
		<div>
			{inventory.reverse().map((singleItem) => {
				const { _id, name, sku, category, quantity, price,value } =
					singleItem;

				const inventoryPassBucket = {
					_id,
					name,
					sku,
					category,
                    quantity,
					price,
					value,
					
				};

				if (inventory.length > 0) {
					return (
						<div className="inventory-info-item-head">
						<div className="running-short-item" key={_id}>
							
							 <td>
							<span  class="item-field-manage-inventory" >
								{name}
							</span>
							</td>
							<span  class="item-field-manage-inventory" >
								{sku}
							</span>
							<span  class="item-field-manage-inventory">
								{category}
							</span>
							<span  class="item-field-manage-inventory" >
								{quantity}
							</span>
							<span  class="item-field-manage-inventory" >
								{price}
							</span>
							<span  class="item-field-manage-inventory" >
								{value}
							</span>

							<span class="item-field-manage-inventory"  >
								{/* view button */}
								<button
									className="action-btns-manage-inventory"
									onClick={() => viewItem(_id)}
								>
									<BiEdit />
								</button>

								 
							</span>
						</div>
						</div>
					);
				}
			})}
		</div>
	);
}
