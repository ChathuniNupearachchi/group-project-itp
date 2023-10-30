import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { Toaster } from 'react-hot-toast';
// user
import Home from "../src/Pages/Home/home"
import Login from "../src/Pages/auth/login"
import Registering from "../src/Pages/auth/register"
import Dashbord from "./Pages/Dashbord";
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
      <Toaster />
        <Routes>

          {/* User manager */}
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registering/>}/>
          <Route path="/Customerdashbord" element={<Dashbord/>}/>
          <Route path="/fogetPass" element={<Fogot/>}/>
          <Route path="/resetpassword/:resetToken" element={<Reset/>}/>

          <Route path="/profile" element={<Sidebar><Layout><Profile/></Layout></Sidebar>}/>
          <Route path="/editProfile" element={<Sidebar><Layout><EditProfile/></Layout></Sidebar>}/>
          <Route path="/Admindashbord" element={<AdminDashbord/>}/>  
          <Route path="/usermanager" element={<Sidebar><Layout><UMDashbord/></Layout></Sidebar>}/>
          <Route path="/staffregister" element={<Sidebar><Layout><Stfregister /></Layout></Sidebar>} />
          <Route path="/Control-access" element={<Sidebar><Layout><AccessControl/></Layout></Sidebar>}/>
          <Route path="/Control-access/Userdetalis/:userId" element={<Sidebar><Layout><UserDetail/></Layout></Sidebar>}/>
          <Route path="/RemovedUser" element={<Sidebar><Layout><RemovedUser/></Layout></Sidebar>}/>

          


          


        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
