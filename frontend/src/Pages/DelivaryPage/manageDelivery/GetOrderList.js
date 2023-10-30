import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";



export default function OrderListContainer(props) {
	const { order } = props;
	const navigate = useNavigate();

	//update function
	const updateOrder = (id) => {
		navigate(`/assign-driver-vehicle`, { state: { id } });
		console.log(id);
	};

  if (order && typeof order === 'object') {
    const orderArray = Object.values(order);

	return (
		<div>
			{orderArray.map((singleOrder) => {
        if (singleOrder && singleOrder._id) {
				const {
					_id,
					user,
					shippingAddress,
					OrderStatus,
				} = singleOrder;

        if (shippingAddress) {
          const {
            address,
            city,
            postalCode
          } = shippingAddress;

				if (order.length > 0) {
					return (
						<div className="delivery-info" key={_id}>
							<span className="item-field-manage-delivery">
								{_id}
							</span>
							<span className="item-field-manage-delivery">
								{user}
							</span>
							<span className="item-field-manage-delivery">
								{address}
							</span>
							<span className="item-field-manage-delivery">
								{city}
							</span>
              <span className="item-field-manage-delivery">
								{postalCode}
							</span>
							<span className="item-field-manage-delivery">
								{OrderStatus}
							</span>
              <span className="item-field-manage-delivery">
                <button className="btn-assign-delivery"
									onClick={() => updateOrder(_id)}>
									assign
								</button>
							</span>
							{/* <span className="item-field-manage-delivery">
								<button className="action-btns-manage-delivery">
									<AiOutlineEye />
								</button>
							</span> */}
						</div>
					);
          }
        }
				}
			})}
		</div>
	);
}
}
