import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import DeleteModal from '../../../../../../components/DeleteModal';
import api from '../../../../../../helpers/axiosInstance';
import { toast } from 'react-toastify';
import { useBoarding } from '../../../../Hooks';
import { useApp } from '../../../../../../hooks/useApp';
import BasicModal from '../../../../../../components/Modal';
import boardingUrl from '../../../../../../urls/boarding';
import EditBoarder from '../EditBoarder';
import { useNavigate } from 'react-router-dom';


const Actions = ({doc}) => {

  const navigate = useNavigate()

  const [openDelete, setOpenDelete] = useState(false)
  const {refreshBoarders, setCurrentId,bookingStatus, setCurrentBoarder, searchTerm, refreshStats, updateSearchResults} = useBoarding()

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    setCurrentBoarder([])
    setCurrentId(0)
   }

  const handleOpenEdit = () => {
    setOpenEditModal(true)
    setCurrentId(doc._id)

  };

  const deleteDoc = async () =>{
    try {
      const response = await api.delete(boardingUrl.delete_boarder.url, {
        params: {id:doc._id },
      });
  
      if (response.status === 201) {
        setOpenDelete(false)
        if (searchTerm.length>2) {
          updateSearchResults()
  
        }else{
          refreshBoarders()
          refreshStats()
        }
        toast.success('Boarder Record Deleted Successfully')
      } else {
        toast.error('Failed to fetch Customer');
      }
    } catch (error) {
      toast.error(error.response);
  
      
    }
  }

  return (
    <div className='flex justify-center items-center gap-3'>
     <FaEye onClick={()=> navigate(`./${doc._id}/view`)} className='text-secondary font-semibold text-lg cursor-pointer' />
     {
      (bookingStatus === 'Booked' || bookingStatus==='In Progress') && (
        <>
          <FaRegEdit onClick={handleOpenEdit} className='text-primary font-semibold text-lg cursor-pointer' />
          <BsTrash onClick={()=>setOpenDelete(true)} className='text-error font-semibold text-lg cursor-pointer' />
        </>
      )

     }
     <DeleteModal open={openDelete} handleClose={()=>setOpenDelete(false)} deleteFunc={deleteDoc} />
     <BasicModal open={openEditModal} element={<EditBoarder handleClose={handleCloseEditModal}/>}/>
    
    </div>
  )
}

export default Actions