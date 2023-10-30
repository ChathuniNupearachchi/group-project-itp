import React, { useState } from 'react'
import Sidebar from '../../../components/ServiceManagemantComp/sidebar/Sidebar'
import Actionbar from '../../../components/ServiceManagemantComp/actionbar/Acionbar'
import './adminLayout.scss'

const AdminLayout = ({children}) => {

  return (
    <div className='layoutWrapper'>
        <Sidebar />
        <div className='rightContainer'>
          <Actionbar />
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