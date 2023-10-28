import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";


export default function DeliveryListContainer(props) {
	const { delivery } = props;
	const navigate = useNavigate();

  if (delivery && typeof delivery === 'object') {
    const deliveryArray = Object.values(delivery);

	return (
		<div>
			{deliveryArray.map((singleDelivery) => {
        if (singleDelivery && singleDelivery._id) {
				const {
					_id,
          userID,
					assignedDriver,
					assignedVehicle,
          departureDate,
          deliveredDate,
					OrderStatus,
				} = singleDelivery;

				if (delivery.length > 0) {
					return (
						<div className="de-info" key={_id}>
							<span className="item-field-manage-de">
								{_id}
							</span>
              <span className="item-field-manage-de">
								{userID}
							</span>
							<span className="item-field-manage-de">
								{assignedDriver.staffId}
							</span>
							<span className="item-field-manage-de">
								{assignedVehicle.vehicleRegNum}
							</span>
              <span className="item-field-manage-de">
								{departureDate}
							</span>
              <span className="item-field-manage-de">
								{deliveredDate}
							</span>
              <span className="item-field-manage-de">
								{OrderStatus}
							</span>
						</div>
					);
          }
				}
			})}
		</div>
	);
}
}
