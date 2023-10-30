import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import "sweetalert2/src/sweetalert2.scss";


export default function driverListContainer(props) {
	const { driver } = props;

  if (driver && typeof driver === 'object') {
    const driverArray = Object.values(driver);

	return (
		<div>
			{driverArray.map((driverInfo) => {
        if (driverInfo && driverInfo._id) {
				const {
					_id,
					staffId,
					firstName,
					contactNo,
					availability,
				} = driverInfo;

				if (driver.length > 0) {
					return (
						<div className="driver-info" key={_id}>
							<span className="item-field-manage-driver">
								{staffId}
							</span>
							<span className="item-field-manage-driver">
								{firstName}
							</span>
							<span className="item-field-manage-driver">
								{contactNo}
							</span>
							<span className="item-field-manage-driver">
								{availability}
							</span>

							<span className="item-field-manage-driver">
								<button className="action-btns-manage-driver">
									<AiOutlineEye />
								</button>
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
