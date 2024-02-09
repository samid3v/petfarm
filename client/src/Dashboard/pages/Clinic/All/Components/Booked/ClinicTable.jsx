import React, { useState } from 'react'
import { useApp } from '../../../../../hooks/useApp';
import LargeDevice from './TableComponent/LargeDevice';
import { IoFilter } from "react-icons/io5";
import BasicModal from '../../../../../components/Modal';
import AddClinic from '../AddClinic';
import { useClinic } from '../../../Hooks';
import Search from './Search';
import SmallDevice from './TableComponent/SmallDevice';

const ClinicTable = () => {

  const {setShowFilterModal, setModalMessage} = useApp();
  const {searchTerm, setSearchTerm} = useClinic()

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
        <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-56 bg-primary px-3 py-2'>Add Appointment</button>
      </div>
      <LargeDevice />
      <SmallDevice />
      <BasicModal open={open} element={<AddClinic handleClose={handleClose}/>}/>
    </div>
  )
}

export default ClinicTable