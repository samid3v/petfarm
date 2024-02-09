import React, { useState } from 'react'
import { useApp } from '../../../../../hooks/useApp';
import LargeDevice from './TableComponent/LargeDevice';
import BasicModal from '../../../../../components/Modal';
import { IoFilter } from "react-icons/io5";
import { useBoarding } from '../../../Hooks';
import AddBoarder from '../AddBoarder';
import Search from './Search';
import SmallDevice from './TableComponent/SmallDevice';

const BookingTable = () => {

  const {setModalOpen, setModalMessage, setShowFilterModal, modalMessage} = useApp();
  const {searchTerm, setSearchTerm} = useBoarding()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showFilterModalFn = () =>{
    setModalMessage(<Search/>)
    setShowFilterModal(true)
  }

  
  return (
    <div className=''>
     <div className='flex justify-between items-center gap-2 p-6  '>
        <IoFilter onClick={showFilterModalFn} className='text-xl hover:text-primary cursor-pointer' />
        <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-40 block bg-primary px-3 py-2'>Add Boarding</button>
      </div>
      <LargeDevice />
      <SmallDevice />
      <BasicModal open={open} element={<AddBoarder handleClose={handleClose}/>}/>
    </div>
  )
}

export default BookingTable