import React, { useEffect } from 'react'
import AdminLayout from '../../../components/inventoryComp/Inventorylayouts/InventoryAdminlayout'
import { useState } from 'react'
import CustomDataGrid from '../../../components/inventoryComp/InventorydataGrid/InventoryCustomDataGrid';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import {ImSearch} from 'react-icons/im'
import {publicRequest}  from '../../../InventoryrequestMethods';
 
import InventoryReport from './InventoryReport';

import './Inventorymanage.scss'


function ManageItems() {

    const [products, setInventory] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    const getProducts = () => {
        publicRequest.get("/products")
        .then(res => {
            setInventory(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProducts()
    }, [isSubmitted])

    
    const handleDelete = (id) => {

      Swal.fire({
        title: 'Confirmation Needed',
        text: "Please confirm your action",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f44336', // Red color for confirm button
        cancelButtonColor: '#4caf50', // Green color for cancel button      
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          publicRequest.delete(' '+ id)
          .then(res => {
              setIsSubmitted(!isSubmitted)
              toast.success('')
          })
          .catch(err => {
            alert(err)
          })
        }
      })
      
    }

    
    const SearchBar = () => {

      const [search, setSearch] = useState('')
    
      console.log(search)
    
      const handleSearch = (e) => {
          e.preventDefault()
          publicRequest.get(`products?search=${search}`)
          .then(res => {
            setInventory(res.data)
          })
          .catch(err => {
            console.log(err)
          })
         
      }
    
      return(

        <div className="InventorysearchBarContainer">        
          <form onSubmit={handleSearch}>
              <input type="text" className="InventorysearchField" value={search}  placeholder='Search...' onChange={(e) => setSearch(e.target.value)}/>
              <button type='submit' className="InventorysearchBtn">
                <ImSearch className='Inventorysearch'/>
              </button>
          </form>
        </div>
      )
    }

    const columns = [
        
        {
          field:"name",
          headerName: "Name",
          headerAlign: "center",
          flex: 2,
          renderCell: (params) => {
            return (
              <div className="InventorylistItemName">
                <img className="InventorylistItemImg" src={params.row.simage} alt="" />
                {params.row.name}
              </div>
            );
          },
        },
        {
          field: "sku",
          headerName: "SKU",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        // {
        //   field: "address",
        //   headerName: "Address",
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 2,
        // },
        // {
        //     field: "nic",
        //     headerName: "NIC",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 2,
        // },
        {
          field: "category",
          headerName: "Category",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        // {
        //   field: "dob",
        //   headerName: "DOB",
        //   headerAlign: "center",
        //   align: "center",
         //   flex: 2,
        // },
        {
          field: "quantity",
          headerName: "Quantity",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
        {
          field: "price",
          headerName: "Price",
          headerAlign: "center",
          align: "center",
          flex: 2,
        },
       
        // {
        //   field: "salary",
        //   headerName: "Salary",
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 2,
        //   valueFormatter: ({ value }) => `Rs. ${value.toFixed(2)}`,
        // },

        {
          field: "action",
          headerName: "Action",
          headerAlign: "center",
          align: "center",
          sortable: false,
          filterable: false,
          flex: 2,
          renderCell: (params) => {
            return (
              <div className='Inventoryaction'>
                 
                <Link to={"/manage-singleitem-page/" + params.row._id}>
                  <FiEdit className='Inventoryedit' />
                </Link>
                
              </div>
            );
          },
        },
      ];

    return (
        <AdminLayout>
            <div className='InventorylistContainer'>
                <CustomDataGrid data={products} columns={columns} searchBar={<SearchBar />} report={<InventoryReport data={products}/>}/> 
            </div>
        </AdminLayout>
    )
}

export default ManageItems