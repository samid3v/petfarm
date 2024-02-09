import React, { useState } from 'react'
import { BsTrash } from "react-icons/bs";
import {FaRegEdit} from 'react-icons/fa'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../../../../../components/DeleteModal';
import trasactionUrl from '../../../../../../urls/transaction';
import api from '../../../../../../helpers/axiosInstance';
import BasicModal from '../../../../../../components/Modal';
import EditDose from '../EditDose';
import vaccineUrl from '../../../../../../urls/vaccine';


const DoseActions = ({doc, refreshData}) => {

  const navigate = useNavigate()

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)

  const handleCloseEditModal = () => {
     setOpenEditModal(false)
     // setCurrentVaccine([])
     // setCurrentId(0)
    }
 
   const handleOpenEdit = () => {
     setOpenEditModal(true)
    //  setCurrentId(doc._id)
 
   };
  
  const deleteDoc = async () =>{
    try {
      const response = await api.delete(vaccineUrl.delete_dose.url, {
        params: {
          id:doc._id,
         },
      });
  
      if (response.status === 201) {
        setOpenDelete(false)
        refreshData()
        toast.success('Vaccine Dose Record Deleted Successfully')
      } else {
        toast.error('Failed to delete Dose');
      }
    } catch (error) {
      toast.error(error.response.data.error);
  
      
    }
  }

  return (
    <div className='flex justify-center items-center gap-3'>
      <BsTrash onClick={()=>setOpenDelete(true)} className='text-error font-semibold text-lg cursor-pointer' />
      <FaRegEdit onClick={handleOpenEdit} className='text-primary font-semibold text-lg cursor-pointer' />
        
     
     <DeleteModal open={openDelete} handleClose={()=>setOpenDelete(false)} deleteFunc={deleteDoc} />
     <BasicModal open={openEditModal} element={<EditDose refreshData={refreshData} id={doc._id} handleClose={handleCloseEditModal}/>}/>
    
    </div>
  )
}

export default DoseActions