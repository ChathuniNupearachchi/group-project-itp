import { FaCommentAlt } from "react-icons/fa";
import { BiSolidEdit} from "react-icons/bi";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { MdOutlineDashboardCustomize ,MdPayment} from "react-icons/md";
import {  AiOutlineUserAdd} from "react-icons/ai";
import { LuView} from "react-icons/lu";


const menu = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
    path: "/usermanager",
  },
 
  {
    title: "Staff Registration",
    icon: <AiOutlineUserAdd />,
    path:"/staffregister",
  },
  {
    title: "Acsess control",
    icon: <MdPayment />,
    path:"/Control-access",
    
  },
  {
    title: "My Account",
    icon: <RiAccountPinBoxFill />,
    childrens: [
      {
        title: "Profile",
        icon: <LuView />,
        path: "/profile",
      },
      {
        title: "Edit Profile",
        icon: <BiSolidEdit />,
        path: "/editProfile",
      },
    ],
  },
 
];

export default menu;
