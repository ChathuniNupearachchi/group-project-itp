import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "../src/Pages/Home/home"
import Login from "../src/Pages/auth/login"
import Registering from "../src/Pages/auth/register"
import Dashbord from "./Pages/Dashbord";
import axios from "axios"
import Profile from "./Pages/profile/profile";
import EditProfile from "./Pages/profile/editProfile";
import AdminDashbord from "./Pages/AdminDashbord";
import UMDashbord from "./Pages/UserManager/userManagerDashbord";
import Stfregister from "./Pages/UserManager/staffRegister"
import AccessControl from "./Pages/UserManager/accessControl";
import UserDetail from "./Pages/UserManager/userDetails";
import Fogot from "./Pages/auth/fogot";
import Reset from "./Pages/auth/reset";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import RemovedUser from "./Pages/UserManager/removeduser";


axios.defaults.withCredentials = true;



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registering/>}/>
          <Route path="/Customerdashbord" element={<Dashbord/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/Admindashbord" element={<AdminDashbord/>}/>
          <Route path="/usermanager" element={<UMDashbord/>}/>
          <Route path="/staffregister" element={<Stfregister />} />
          <Route path="/Control-access" element={<Sidebar><Layout><AccessControl/></Layout></Sidebar>}/>
          <Route path="/Control-access/Userdetalis/:userId" element={<UserDetail/>}/>
          <Route path="/fogetPass" element={<Fogot/>}/>
          <Route path="/resetpassword/:resetToken" element={<Reset/>}/>
          <Route path="/RemovedUser" element={<Sidebar><Layout><RemovedUser/></Layout></Sidebar>}/>
          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
