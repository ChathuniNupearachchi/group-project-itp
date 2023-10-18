import React, { useState } from 'react'

import Sidebar from '../Inventorysidebar/InventorySidebar'
import Actionbar from '../Inventoryactionbar/InventoryActionbar'
import './InventoryAdminLayout.scss'

const AdminLayout = ({children}) => {

  return (
    <div className='adminlayoutWrapper'>
        <Sidebar />
        <div className='layoutrightContainer'>
          <Actionbar />
          <div className='layoutcontent'>
          {
            children
          }
          </div>
        </div>
    </div>
  )
}

export default AdminLayout;