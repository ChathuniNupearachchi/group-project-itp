import "./App.css"
import {BrowserRouter , Router, Routes,Route} from "react-router-dom"
import { Toaster } from 'react-hot-toast';

 


import AddItem from "./pages/add-item-page/AddItem";

import 'bootstrap/dist/css/bootstrap.min.css';
import ViewInventoryItems from "./pages/view-item-page/ViewItem";
import ViewInventoryItem from "./pages/view-singleitem-page/ViewSingleItem";
import ManageItems from "./pages/manage-item-page/ManageItem";
import ManageSingleItem from "./pages/manage-single-item-page/ManageSingleItem";
import UpdateItem from "./pages/update-Item-page/Update";
import OverviewComponent from "./pages/dashboard-page/overview";


function App() {
  return (
    
    <BrowserRouter> 
    <Toaster />
    <Routes>
      
      
       

      

 
      <Route path ="/add-item-page" element={
        
          
            <AddItem/>
          
        }
        />

<Route path ="/view-inventory-page" element={
        
          
        <ViewInventoryItems/>
      
    }
    />

<Route path ="/view-singleitem-page/:id" element={
        
          
        <ViewInventoryItem/>
      
    }
    />

<Route path ="/manage-item-page" element={
        
          
        <ManageItems/>
      
    }
    />

<Route path ="/manage-singleitem-page/:id" element={
        
          
        <ManageSingleItem/>
      
    }
    />


<Route path ="/update-item-page/:id" element={
        
          
        <UpdateItem/>
      
    }
    />
    <Route path ="/" element={
        
          
        <OverviewComponent/>
      
    }
    />

    </Routes>
    </BrowserRouter>
    
  
  );
}

export default App;
