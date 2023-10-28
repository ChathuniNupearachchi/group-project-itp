import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';




//service management
import AddService from './pages/Services/AddService'
import ManageService from './pages/Services/ManageService';
import ReturnDash from './pages/Services/ReturnDash';
import RefundDash from './pages/Services/RefundDash';
import MonthlyReport from './pages/Services/MonthlyReport';

function App() {
  return (
    <Router>
      <Toaster />
      
      <Routes>
        
        {/* service routes */}
        <Route path='/admin/service/AddService' element={< AddService />} />
        <Route path='/admin/service/ManageServices' element={< ManageService />} />
        

        {/* dashboards routes */}
        <Route path='/admin/service/ReturnDash' element={< ReturnDash />} />
        <Route path='/admin/service/RefundDash' element={< RefundDash />} />

        {/* dashboards routes */}
        <Route path='/admin/service/MonthlyReport' element={< MonthlyReport />} />
      
      </Routes>
    </Router>
  )
}

export default App;