import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import DeliveryDashboard from './pages/deliveryDashboard/Dashboard';
import RegisterVehicle from './pages/manageVehicle/registerVehicle/AddVehicle'
import VehicleFleet from './pages/manageVehicle/vehicleFleet/VehicleFleet'
import UpdateVehicle from './pages/manageVehicle/updateVehicle/UpdateVehicle';
import DriverList from './pages/driverList/DriverList';
import ProcessingOrders from './pages/manageDelivery/ViewProcessingOrders';
import AssignToOrder from './pages/manageDelivery/AssignDriverVehicle';
import DeliveryList from './pages/manageDelivery/deliveryList/DeliveryList';
import CompletedDeliveries from './pages/manageDelivery/completedDeliveries/completedDeliveries';

function App() {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path='/delivery-dashboard' element={<DeliveryDashboard/>}/>
        <Route path='/add-vehicle' element={<RegisterVehicle/>}/>
        <Route path='/view-vehicle' element={<VehicleFleet/>}/>
        <Route path='/update-vehicle' element={<UpdateVehicle/>}/>
        <Route path='/view-drivers' element={<DriverList/>}/>
        <Route path='/delivery-view-processing-orders' element={<ProcessingOrders/>}/>
        <Route path='/assign-driver-vehicle' element={<AssignToOrder/>}/>
        <Route path='/delivery-list' element={<DeliveryList/>}/>
        <Route path='/completed-deliveries' element={<CompletedDeliveries/>}/>
      </Routes>
    </Router>
  );
}

export default App;
