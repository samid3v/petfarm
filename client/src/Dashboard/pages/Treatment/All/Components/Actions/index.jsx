import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import DeleteModal from '../../../../../components/DeleteModal';
import api from '../../../../../helpers/axiosInstance';
import { toast } from 'react-toastify';
import { useTreatment } from '../../../Hooks';
import BasicModal from '../../../../../components/Modal';
import boardingUrl from '../../../../../urls/boarding';
import EditTreatment from '../EditTreatment';
import { useNavigate } from 'react-router-dom';
import treatmentUrl from '../../../../../urls/treatment';


const Actions = ({doc}) => {

  const navigate = useNavigate()

  const [openDelete, setOpenDelete] = useState(false)
  const {refreshTreatments, setCurrentId, setCurrentTreatment, searchTerm, updateSearchResults} = useTreatment()

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    setCurrentTreatment([])
    setCurrentId(0)
   }

  const handleOpenEdit = () => {
    setOpenEditModal(true)
    setCurrentId(doc._id)

  };

  const deleteDoc = async () =>{
    try {
      const response = await api.delete(treatmentUrl.delete_transaction.url, {
        params: {id:doc._id },
      });
  
      if (response.status === 201) {
        setOpenDelete(false)
        if (searchTerm.length>2) {
          updateSearchResults()
  
        }else{
          refreshTreatments()
        }
        toast.success('Treatment Record Deleted Successfully')
      } else {
        toast.error('Failed to fetch Treatment');
      }
    } catch (error) {
      // toast.error(error.response.data.error);
      console.log(error)
   
    }
  }

  return (
    <div className='flex justify-center items-center gap-3'>
     <FaEye onClick={()=> navigate(`./${doc._id}/view`)} className='text-secondary font-semibold text-lg cursor-pointer' />
          <FaRegEdit onClick={handleOpenEdit} className='text-primary font-semibold text-lg cursor-pointer' />
          <BsTrash onClick={()=>setOpenDelete(true)} className='text-error font-semibold text-lg cursor-pointer' />
        
     
     <DeleteModal open={openDelete} handleClose={()=>setOpenDelete(false)} deleteFunc={deleteDoc} />
     <BasicModal open={openEditModal} element={<EditTreatment handleClose={handleCloseEditModal}/>}/>
    
    </div>
  )
}

export default Actions