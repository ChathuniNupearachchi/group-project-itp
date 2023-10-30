import React, { useState } from 'react'

import Sidebar from '../delivery-sidebar/Delivery-Sidebar'
import Header from '../delivery-header/Delivery-Header'
import './AdminLayout.scss'

const AdminLayout = ({children}) => {

  return (
    <div className='layoutWrapper'>
        <Sidebar />
        <div className='rightContainer'>
          <Header/>
          <div className='content'>
          {
            children
          }
          </div>
        </div>
    </div>
  )
}

export default AdminLayout