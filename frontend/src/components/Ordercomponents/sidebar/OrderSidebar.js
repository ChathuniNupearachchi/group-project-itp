import { IoIosPeople } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { MdHolidayVillage } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

const SidebarItems = [

	{
		id: 3000,
		text: "Order Managment",
		nestedFunctions: [
			{
				id: 300,
				link: "/Order-dashbord",
				nestedItemicon: <AiOutlineUserAdd />,
				nestedItemtext: " Dashboard",
			},

			

		],
	},

	{
		id: 3000,
		text: "Display Orders",
		nestedFunctions: [
		

			{
				id: 303,
				link: "/Manage-Orders",
				nestedItemicon: <MdHolidayVillage />,
				nestedItemtext: "Manage Orders",
			},

		],
	},

	{
		id: 3000,
		text: "View Order",
		nestedFunctions: [

			{
				id: 304,
				link: "/OrderDetails/:orderId",
				nestedItemicon: <GiTakeMyMoney />,
				nestedItemtext: "Order Details",
			},

			{
				id: 305,
				link: "/Cancel-Orders",
				nestedItemicon: <GiTakeMyMoney />,
				nestedItemtext: "Cancel Order Details",
			},

			
		],
	},

	
	{
		id: 3000,
		text: "Profile",
		nestedFunctions: [

			{
				id: 304,
				link: "/OrderManagerProfile",
				nestedItemicon: <GiTakeMyMoney />,
				nestedItemtext: "Profile",
			},

			{
				id: 305,
				link: "/OrderManagerEditProfile",
				nestedItemicon: <GiTakeMyMoney />,
				nestedItemtext: "Edit Profile",
			},

			
		],
	},


];

export default SidebarItems;