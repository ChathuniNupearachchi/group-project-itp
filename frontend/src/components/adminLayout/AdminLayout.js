import React, { useState } from 'react'

import Sidebar from '../delivery-sidebar/Delivery-Sidebar'
import Header from '../delivery-header/Delivery-Header'
import './AdminLayout.scss'

const AdminLayout = ({children}) => {

  return (
    <div className='delivery-layoutWrapper'>
        <Sidebar />
        <div className='delivery-rightContainer'>
          <Header/>
          <div className='delivery-content'>
          {
            children
          }
          </div>
        </div>
    </div>
  )
}

export default AdminLayout