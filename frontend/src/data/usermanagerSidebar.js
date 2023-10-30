import { BiSolidEdit} from "react-icons/bi";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { MdOutlineDashboardCustomize ,MdPayment} from "react-icons/md";
import {  AiOutlineUserAdd} from "react-icons/ai";
import { LuView} from "react-icons/lu";


const menu = [
  {
    title:  <span style={{ color: "white", margin:'5px' ,textDecoration: 'none'}}>Dashboard</span>,
    icon: <MdOutlineDashboardCustomize style={{ color: "white" ,marginTop:'13px'}}/>,
    path: "/usermanager",
  },
 
  {
    title: <span style={{ color: "white", margin:'5px',textDecoration: 'none'}}>Staff Registration</span>,
    icon: <AiOutlineUserAdd style={{ color: "white" ,marginTop:'13px'}} />,
    path:"/staffregister",
  },
  {
    title: <span style={{ color: "white", margin:'5px',textDecoration: 'none'}}>Access Control</span>,
    icon: <MdPayment style={{ color: "white" ,marginTop:'13px'}} />,
    path:"/Control-access",
    
  },
  {
    title: <span style={{ color: "white", margin:'5px'}}>My Account</span>,
    icon: <RiAccountPinBoxFill style={{ color: "white" ,marginTop:'13px'}} />,
    childrens: [
      {
        title: <span style={{ color: "white", margin:'5px'}}>Profile</span>,
        icon: <LuView style={{ color: "white" ,marginTop:'13px'}} />,
        path: "/profile",
      },
      {
        title: <span style={{ color: "white", margin:'5px'}}>Edit Profile</span>,
        icon: <BiSolidEdit style={{ color: "white" ,marginTop:'13px'}} />,
        path: "/editProfile",
      },
    ],
  },
];

export default menu;
