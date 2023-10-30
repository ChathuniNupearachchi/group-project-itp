import {BrowserRouter, Routes, Route} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { Toaster } from 'react-hot-toast';




//suplier
import ManagePayroll from "./Pages/SuppliePages/Supplier/Payroll/ManagePayroll";
import AddPayroll from "./Pages/SuppliePages/Supplier/Payroll/AddPayroll";
import EditPayroll from "./Pages/SuppliePages/Supplier/Payroll/EditPayroll";
import UpdateSupplierDetails from "./Pages/SuppliePages/Supplier/management/update-supplier-page/update-supplier";
import ManageSupplierWindow from "./Pages/SuppliePages/Supplier/management/manage-supplier/manage-supplier";
import OverviewPage from "./Pages/SuppliePages/Supplier/management/overview-page/overview"
import SupplierRegForm from "./Pages/SuppliePages/Supplier/management/register-supplier-page/supplier-register"
import ViewSupplierDetails from "./Pages/SuppliePages/Supplier/management/view-supplier/view-supplier"
import ViewPayroll from "./Pages/SuppliePages/Supplier/Payroll/ViewPayroll";
import SupplierManagerProfile from "./Pages/profile/SupplierManagerProfile";
import SupplierMagerEditProfile from "./Pages/profile/SupplierMangerEditProfile";

//staff
import AddStaff from "./Pages/StaffManagePage/Staff/Staff/AddStaff";
import ManageStaff from "./Pages/StaffManagePage/Staff/Staff/ManageStaff";
import EditStaff from "./Pages/StaffManagePage/Staff/Staff/EditStaff";
import ViewStaff from "./Pages/StaffManagePage/Staff/Staff/ViewStaff";
import AddLeave from "./Pages/StaffManagePage/Staff/Leave/AddLeave";
import ManageLeaves from "./Pages/StaffManagePage/Staff/Leave/ManageLeave";
import EditLeave from "./Pages/StaffManagePage/Staff/Leave/EditLeave";
import ViewLeave from "./Pages/StaffManagePage/Staff/Leave/ViewLeave";

import AddstaffPayroll from "./Pages/StaffManagePage/Staff/Payroll/AddPayroll";
import EditstaffPayroll from "./Pages/StaffManagePage/Staff/Payroll/EditPayroll";
import ViewstaffPayroll from "./Pages/StaffManagePage/Staff/Payroll/ViewPayroll";
import ManagestaffPayroll from "./Pages/StaffManagePage/Staff/Payroll/ManagePayroll";
import StaffManagerProfile from "./Pages/profile/StaffManagerProfile";
import StaffMagerEditProfile from "./Pages/profile/StaffManagerEditProfile";

//inventory managemant
// import AdminLayout from "./Inventorycomponents/layouts/Adminlayout";
// import Dashboard from "./Inventorypages/dashboard/Dashboard"
// import AddItem from "./Inventorypages/add-item-page/AddItem";
// import ViewInventoryItems from "./Inventorypages/view-item-page/ViewItem"
// import ViewInventoryItem from "./Inventorypages/view-singleitem-page/ViewSingleItem";
// import ManageItems from "./Inventorypages/manage-item-page/ManageItem";
// import ManageSingleItem from "./Inventorypages/manage-single-item-page/ManageSingleItem";
// import UpdateItem from "./Inventorypages/update-Item-page/Update";


//order managemant
import OMDashboard from "./Pages/Orderpages/dashboard/dashboard";
import ManageOrders from "./Pages/Orderpages/ManageOrders/ManageOrder";
import OrderDetails from "./Pages/Orderpages/Order/OrderDetails";
import CancelledOrders from "./Pages/Orderpages/cancelOrder/cancelOrder";
import OrderManagerProfile from "./Pages/profile/OrderManagerProfile";
import OrderManagerEditProfile from "./Pages/profile/OrderManagerEditProfile";

//inventory
import OverviewComponent from "./Pages/InventoryPages/dashboard-page/overview";
import AddItem from "./Pages/InventoryPages/add-item-page/AddItem";
import ViewInventoryItem from "./Pages/InventoryPages/view-singleitem-page/ViewSingleItem";
import ManageItems from "./Pages/InventoryPages/manage-item-page/ManageItem";
import ManageSingleItem from "./Pages/InventoryPages/manage-single-item-page/ManageSingleItem";
import UpdateItem from "./Pages/InventoryPages/update-Item-page/Update";
import ViewInventoryItems from "./Pages/InventoryPages/view-item-page/ViewItem"

//delivary
import DeliveryDashboard from "./Pages/DelivaryPage/deliveryDashboard/Dashboard";
import RegisterVehicle from "./Pages/DelivaryPage/manageVehicle/registerVehicle/AddVehicle";
import VehicleFleet from "./Pages/DelivaryPage/manageVehicle/vehicleFleet/VehicleFleet";
import UpdateVehicle from "./Pages/DelivaryPage/manageVehicle/updateVehicle/UpdateVehicle";
import DriverList from "./Pages/DelivaryPage/driverList/DriverList";
import ProcessingOrders from "./Pages/DelivaryPage/manageDelivery/ViewProcessingOrders";
import AssignToOrder from "./Pages/DelivaryPage/manageDelivery/AssignDriverVehicle";
import DeliveryList from "./Pages/DelivaryPage/manageDelivery/deliveryList/DeliveryList";
import DelivartManagerProfile from "./Pages/profile/DelivaryManagerProfile";
import DelivaryEditProfile from "./Pages/profile/DilevaryManagerEditProfile";


//Complain managemat
import AddService from "./Pages/ServiceManagePage/Services/AddService";
import ManageService from "./Pages/ServiceManagePage/Services/ManageService";
import ReturnDash from "./Pages/ServiceManagePage/Services/ReturnDash";
import MonthlyReport from "./Pages/ServiceManagePage/Services/MonthlyReport";
import RefundDash from "./Pages/ServiceManagePage/Services/RefundDash"








axios.defaults.withCredentials = true;



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Toaster />
        <Routes>

        <Route path="/admin/inventory/overview" element={<OverviewPage />} />
       
        <Route path="/admin/inventory/supplier-registration" element={<SupplierRegForm />}/>
        <Route path="/admin/inventory/manage-suppliers" element={<ManageSupplierWindow />}/>
        <Route path="/admin/inventory/report" />
        <Route path="/admin/supplier/view-supplier-details" element={<ViewSupplierDetails/>} />
        <Route path="/admin/supplier/update-supplier-details" element={<UpdateSupplierDetails/>} />

        <Route path='/admin/payroll/AddPayroll' element={< AddPayroll />} />
        <Route path='/admin/payroll/ManagePayroll' element={< ManagePayroll />} />
        <Route path='/admin/payroll/EditPayroll/:id' element={<EditPayroll />} />
        <Route path='/admin/payroll/ViewPayroll/:id' element={<ViewPayroll/>} />
        <Route path="/admin/supplierManagerProfile" element={<SupplierManagerProfile />} />
        <Route path="/admin/supplierManagerEditProfile" element={<SupplierMagerEditProfile />} />




        {/* Staff routes */}
        <Route path='/admin/staff/AddStaff' element={< AddStaff />} />
        <Route path='/admin/staff/ManageStaff' element={<ManageStaff />} />
        <Route path='/admin/staff/EditSatff/:id' element={<EditStaff />} />
        <Route path='/admin/staff/ViewStaff/:id' element={<ViewStaff />} />

        <Route path='/admin/payroll/AddstaffPayroll' element={< AddstaffPayroll />} />
        <Route path='/admin/payroll/ManagestaffPayroll' element={< ManagestaffPayroll />} />
        <Route path='/admin/payroll/EditstaffPayroll/:id' element={<EditstaffPayroll />} />
        <Route path='/admin/payroll/ViewstaffPayroll/:id' element={<ViewstaffPayroll/>} />
        
        <Route path='/admin/leave/AddLeave' element={< AddLeave />} />
        <Route path='/admin/leave/ManageLeave' element={< ManageLeaves />} />
        <Route path='/admin/leave/EditLeave/:id' element={<EditLeave />} />
        <Route path='/admin/leave/ViewLeave/:id' element={<ViewLeave/>} />
        <Route path='/admin/staffManagerProfile' element={<StaffManagerProfile/>} />
        <Route path='/admin/staffManagerEditProfile' element={<StaffMagerEditProfile/>} />
        



        {/* Inventory Managemant */}
        <Route path ="/Inventory-overView" element={<OverviewComponent/>}/>
        <Route path ="/add-item-page" element={<AddItem/>}/>
        <Route path ="/view-inventory-item" element={<ViewInventoryItems/> }/>
        <Route path ="/view-singleitem-page/:id" element={<ViewInventoryItem/>} />
        <Route path ="/manage-item-page" element={<ManageItems/> }/>
        <Route path ="/manage-singleitem-page/:id" element={<ManageSingleItem/>} />
        <Route path ="/update-item-page/:id" element={<UpdateItem/> }/>


        {/* Order Managemant */}
        <Route path="/Order-dashbord" element={<OMDashboard />}/>
        <Route path="/Manage-Orders" element={<ManageOrders/>}/>
        <Route path="/OrderDetails/:orderId" element={<OrderDetails/>}/>
        <Route path="/Cancel-Orders" element={<CancelledOrders/>}/>
        <Route path="/OrderManagerProfile" element={<OrderManagerProfile/>}/>
        <Route path="/OrderManagerEditProfile" element={<OrderManagerEditProfile/>}/>


        {/* Delivary managemant */}
        <Route path='/delivery-dashboard' element={<DeliveryDashboard/>}/>
        <Route path='/add-vehicle' element={<RegisterVehicle/>}/>
        <Route path='/view-vehicle' element={<VehicleFleet/>}/>
        <Route path='/update-vehicle' element={<UpdateVehicle/>}/>
        <Route path='/view-drivers' element={<DriverList/>}/>
        <Route path='/delivery-view-processing-orders' element={<ProcessingOrders/>}/>
        <Route path='/assign-driver-vehicle' element={<AssignToOrder/>}/>
        <Route path='/delivery-list' element={<DeliveryList/>}/>
        <Route path='/DelivaryManagerProfile' element={<DelivartManagerProfile/>}/>
        <Route path='/DelivaryManagerEditProfile' element={<DelivaryEditProfile/>}/>


        {/* Complain managemant */}
        {/* service routes */}
        <Route path='/admin/service/AddService' element={< AddService />} />
        <Route path='/admin/service/ManageServices' element={< ManageService />} />
        

        {/* dashboards routes */}
        <Route path='/admin/service/ReturnDash' element={< ReturnDash />} />
        <Route path='/admin/service/RefundDash' element={< RefundDash />} />

        {/* dashboards routes */}
        <Route path='/admin/service/MonthlyReport' element={< MonthlyReport />} />



        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
