import { TbTruckDelivery } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
import { TbPackageExport } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";


const SidebarItems = [
	{
		id: 1000,
		icon: <TbTruckDelivery />,
		text: "Delivery Management",
	},

	{
		id: 1000,
		link: "/delivery-dashboard",
		icon: <TbTruckDelivery />,
		text: "Dashboard",
	},

			{
				id: 100,
				icon: <FaUserPlus />,
				text: "Manage Vehicle",
				nestedFunctions:[

					{
						id: 101,
						link: "/add-vehicle",
						nestedItemicon: <FaUserEdit />,
						nestedItemtext: "Register Vehicle",
					},

					{
						id: 101,
						link: "/view-vehicle",
						nestedItemicon: <FaUserEdit />,
						nestedItemtext: "Vehicle Fleet",
					},
				],
			},

			{
				id: 101,
				link: "/view-drivers",
				icon: <FaUserEdit />,
				text: "Driver List",
			},

			{
				id: 100,
				icon: <FaUserPlus />,
				text: "Manage Delivery",
				nestedFunctions:[

					{
						id: 101,
						link: "/delivery-view-processing-orders",
						nestedItemicon: <FaUserEdit />,
						nestedItemtext: "Orders To Be Proceed",
					},

					{
						id: 101,
						link: "/delivery-list",
						nestedItemicon: <FaUserEdit />,
						nestedItemtext: "Delivery List",
					},
				],
			},

			{
				id: 100,
				icon: <FaUserPlus />,
				text: "Profile",
				nestedFunctions:[

					{
						id: 101,
						link: "/DelivaryManagerProfile",
						nestedItemicon: <FaUserEdit />,
						nestedItemtext: "Profile",
					},

					{
						id: 101,
						link: "/DelivaryManagerEditProfile",
						nestedItemicon: <FaUserEdit />,
						nestedItemtext: "EditProfile",
					},
				],
			},


			// {
			// 	id: 102,
			// 	link: "/admin/delivery/view-order",
			// 	icon: <TbPackageExport />,
			// 	text: "Tracking",
			// },

		
	

];

export default SidebarItems;