import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../Layouts/AdminLayout';
import { userRequest } from '../../../../requestMethods'
import { toast } from 'react-hot-toast';

import './ViewStaff.scss'

function ViewStaff() {

    const { id } = useParams()

    const [firstName,setfirstName] = useState("")
    const [other,setother] = useState("")
    const [address,setaddress] = useState("")
    const [nic,setnic] = useState("")
    const [contactNo,setcontactNo] = useState("")
    const [dob,setdob] = useState("")
    const [email,setemail] = useState("")
    const [staffId,setstaffId] = useState("")
    const [role,setrole] = useState("")
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        userRequest.get('/staff/' + id)
        .then(res => {
            setfirstName(res.data.firstName)
            setother(res.data.other)
            setaddress(res.data.address)
            setnic(res.data.nic)
            setcontactNo(res.data.contactNo)
            setdob(res.data.dob)
            setemail(res.data.email)
            setstaffId(res.data.staffId)
            setrole(res.data.role)
           
            setImageURL(res.data.simage)
        }).catch(err =>{
            toast.error(err.message)
        })
      }, [id])

    return (
        <AdminLayout>
            <div className='staff'>
                


                <div className='staff-record-container'>
                <h2>VIEW EMPLOYEE DETAILS<hr></hr></h2>
                    <div className = "staff-pic-container">
                        <img src={imageURL} className='staff-img'></img>
                    </div>
                    <div className = "staff-details-container">                     
                        <div className='staff-line'>
                            <span className='staff-line-info'style={{  marginbottom: '25px', margintop: '20px', fontSize: '18px' }}>First Name :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{firstName}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info' style={{ fontSize: '18px' }}>Physical Disability :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{other}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info' style={{ fontSize: '18px' }}>Address :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{address}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info' style={{ fontSize: '18px' }}>NIC :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{nic}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info' style={{ fontSize: '18px' }}>Contact No :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{contactNo}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info' style={{ fontSize: '18px' }}>Date of Birth :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{dob}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info' style={{ fontSize: '18px' }}>Email :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{email}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info' style={{ fontSize: '18px' }}>Staff Id :</span>
                            <span className='staff-line-info-values' style={{ fontSize: '18px' }}>{staffId}</span>
                        </div>
                        <div className='staff-line'>
                            <span className='staff-line-info'style={{ fontSize: '18px' }}>Job Role :</span>
                            <span className='staff-line-info-values'style={{ fontSize: '18px' }}>{role}</span>
                        </div>
                        
                    </div> 
                </div>
            
            </div>
        </AdminLayout>
    )
}

export default ViewStaff