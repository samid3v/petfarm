import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import DeleteModal from '../../../../../components/DeleteModal';
import api from '../../../../../helpers/axiosInstance';
import patientUrl from '../../../../../urls/patients';
import { toast } from 'react-toastify';
import { useOwners } from '../../../Hooks';
import { useApp } from '../../../../../hooks/useApp';
import ViewCustomer from '../viewCustomer';
import BasicModal from '../../../../../components/Modal';
import customersUrl from '../../../../../urls/customers';
import EditOwner from '../EditOwner';


const Actions = ({doc}) => {

  const [openDelete, setOpenDelete] = useState(false)
  const {getAllCustomers, setCurrentId, setCurrentCustomer, searchTerm, currentPage, updateSearchResults} = useOwners()

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    setCurrentId(doc._id)
  };
  const handleClose = () => {
    setOpen(false)
    setCurrentCustomer([])
    setCurrentId(0)
  };

  const handleCloseEditModa = () => {
    setOpenEditModal(false)
    setCurrentCustomer([])
    setCurrentId(0)
   }

  const handleOpenEdit = () => {
    setOpenEditModal(true)
    setCurrentId(doc._id)

  };

  const deleteDoc = async () =>{
    try {
      const response = await api.delete(customersUrl.delete_customer.url, {
        params: {id:doc._id },
      });
  
      if (response.status === 201) {
        setOpenDelete(false)
        if (searchTerm.length>2) {
          updateSearchResults()
  
        }else{
          getAllCustomers(currentPage, 10)
  
        }
        toast.success('Customer Record Deleted Successfully')
      } else {
        toast.error('Failed to fetch Customer');
      }
    } catch (error) {
      toast.error(error.response);
  
      
    }
  }

  return (
    <div className='flex justify-center items-center gap-3'>
     <FaEye onClick={handleOpen} className='text-secondary font-semibold text-lg cursor-pointer' />
     <FaRegEdit onClick={handleOpenEdit} className='text-primary font-semibold text-lg cursor-pointer' />
     <BsTrash onClick={()=>setOpenDelete(true)} className='text-error font-semibold text-lg cursor-pointer' />
     <DeleteModal open={openDelete} handleClose={()=>setOpenDelete(false)} deleteFunc={deleteDoc} />
     <BasicModal open={open} element={<ViewCustomer handleClose={handleClose}/>}/>
     <BasicModal open={openEditModal} element={<EditOwner handleClose={handleCloseEditModa}/>}/>
    
    </div>
  )
}

export default Actions