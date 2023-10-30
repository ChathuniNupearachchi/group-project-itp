import { Md10K, MdLibraryAdd } from "react-icons/md";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";

const SidebarItems = [
	
	{
		id: 5000,
		icon: <MdOutlineHomeRepairService />,
		text: "Service Management",
		nestedFunctions: [
			{
				id: 500,
				link: "/admin/service/AddService",
				nestedItemicon: <MdLibraryAdd />,
				nestedItemtext: "Add Service",
			},

			{
				id: 501,
				link: "/admin/service/ManageServices",
				nestedItemicon: <MdMedicalServices />,
				nestedItemtext: "Manage Services",
			},
		
			{
				id: 502,
				link: "/admin/service/MonthlyReport",
				nestedItemicon: <MdLibraryAdd />,
				nestedItemtext: "Dashboard",
			},

			{
				id: 503,
				link: "/admin/service/ReturnDash",
				nestedItemicon: < Md10K />,
				nestedItemtext: "Return Dashboard",
			},

			{
				id: 504,
				link: "/admin/service/RefundDash",
				nestedItemicon: <MdMedicalServices />,
				nestedItemtext: "Refund Dashboard",
			},
		]
	}
]
	

export default SidebarItems;