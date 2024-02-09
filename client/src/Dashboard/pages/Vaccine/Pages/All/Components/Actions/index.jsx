import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import DeleteModal from '../../../../../../components/DeleteModal';
import api from '../../../../../../helpers/axiosInstance';
import { toast } from 'react-toastify';
import { useVaccine } from '../../../../Hooks';
import BasicModal from '../../../../../../components/Modal';
import { useNavigate } from 'react-router-dom';
import treatmentUrl from '../../../../../../urls/treatment';
import EditVaccine from '../EditVaccine';
import vaccineUrl from '../../../../../../urls/vaccine';


const Actions = ({doc}) => {

  const navigate = useNavigate()

  const [openDelete, setOpenDelete] = useState(false)
  const {refreshVaccines, setCurrentId, setCurrentVaccine, searchTerm, updateSearchResults} = useVaccine()

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    setCurrentVaccine([])
    setCurrentId(0)
   }

  const handleOpenEdit = () => {
    setOpenEditModal(true)
    setCurrentId(doc._id)

  };

  const deleteDoc = async () =>{
    try {
      const response = await api.delete(vaccineUrl.delete_vaccine.url, {
        params: {id:doc._id },
      });
  
      if (response.status === 201) {
        setOpenDelete(false)
        if (searchTerm.length>2) {
          updateSearchResults()
  
        }else{
          refreshVaccines()
        }
        toast.success('Vaccine Record Deleted Successfully')
      } else {
        toast.error('Failed to fetch Vaccine');
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
     <BasicModal open={openEditModal} element={<EditVaccine handleClose={handleCloseEditModal}/>}/>
    
    </div>
  )
}

export default Actions