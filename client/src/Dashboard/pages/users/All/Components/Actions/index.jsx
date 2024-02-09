import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { IoLockClosed } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import DeleteModal from '../../../../../components/DeleteModal';
import api from '../../../../../helpers/axiosInstance';
import patientUrl from '../../../../../urls/patients';
import { toast } from 'react-toastify';
import { useUsers } from '../../../Hooks';
import { useApp } from '../../../../../hooks/useApp';
import BasicModal from '../../../../../components/Modal';
import customersUrl from '../../../../../urls/customers';
import EditOwner from '../EditOwner';
import usersUrl from '../../../../../urls/user';


const Actions = ({doc}) => {

  const [openDelete, setOpenDelete] = useState(false)
  const {user} = useApp()
  const {refreshUsers, setCurrentId, setCurrentUser, searchTerm, currentPage, updateSearchResults} = useUsers()

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    setCurrentId(doc._id)
  };
  const handleClose = () => {
    setOpen(false)
    setCurrentUser([])
    setCurrentId(0)
  };

  const handleCloseEditModa = () => {
    setOpenEditModal(false)
    setCurrentUser([])
    setCurrentId(0)
   }

  const handleOpenEdit = () => {
    setOpenEditModal(true)
    setCurrentId(doc._id)

  };

  const deleteDoc = async () =>{
    try {
      const response = await api.delete(usersUrl.delete_user.url, {
        params: {id:doc._id },
      });
  
      if (response.status === 201) {
        setOpenDelete(false)
        if (searchTerm.length>2) {
          updateSearchResults()
  
        }else{
          refreshUsers()
  
        }
        toast.success('Use Record Deleted Successfully')
      } else {
        toast.error('Failed to fetch Customer');
      }
    } catch (error) {
      toast.error(error.response);
  
      
    }
  }

  return (
    <>
      {(user?.user?.role==='admin' || user?.user?.role==='superadmin') && (<div className='flex justify-center items-center gap-3'>
        <IoLockClosed className='font-semibold text-gray-400 text-lg cursor-pointer'/>
        <FaRegEdit onClick={handleOpenEdit} className='text-primary font-semibold text-lg cursor-pointer' />
        <BsTrash onClick={()=>setOpenDelete(true)} className='text-error font-semibold text-lg cursor-pointer' />
        <DeleteModal open={openDelete} handleClose={()=>setOpenDelete(false)} deleteFunc={deleteDoc} />
        <BasicModal open={openEditModal} element={<EditOwner handleClose={handleCloseEditModa}/>}/>
      
      </div>)}
    </>
  )
}

export default Actions