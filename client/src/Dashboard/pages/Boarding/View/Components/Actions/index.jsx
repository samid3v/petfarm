import React, { useState } from 'react'
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../../../../components/DeleteModal';
import trasactionUrl from '../../../../../urls/transaction';
import api from '../../../../../helpers/axiosInstance';


const Actions = ({doc, refreshData}) => {

  const navigate = useNavigate()

  const [openDelete, setOpenDelete] = useState(false)
  
  const deleteDoc = async () =>{
    try {
      const response = await api.delete(trasactionUrl.delete_transaction.url, {
        params: {
          id:doc._id,
          pay_id: doc.payment_id._id
         },
      });
  
      if (response.status === 200) {
        setOpenDelete(false)
        refreshData()
        toast.success('Transaction Record Deleted Successfully')
      } else {
        toast.error('Failed to delete Transaction');
      }
    } catch (error) {
      toast.error(error.response);
  
      
    }
  }

  return (
    <div className='flex justify-center items-center gap-3'>
      <BsTrash onClick={()=>setOpenDelete(true)} className='text-error font-semibold text-lg cursor-pointer' />
        
     
     <DeleteModal open={openDelete} handleClose={()=>setOpenDelete(false)} deleteFunc={deleteDoc} />
     {/* <BasicModal open={openEditModal} element={<EditBoarder handleClose={handleCloseEditModal}/>}/> */}
    
    </div>
  )
}

export default Actions