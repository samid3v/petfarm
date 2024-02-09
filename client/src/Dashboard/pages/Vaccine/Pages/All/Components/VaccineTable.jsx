import React, { useState } from 'react'
import { useApp } from '../../../../../hooks/useApp';
import LargeDevice from './TableComponent/LargeDevice';
import BasicModal from '../../../../../components/Modal';
import { IoFilter } from "react-icons/io5";
import AddVaccine from './AddVaccine';
import Search from './Search';
import SmallDevice from './TableComponent/SmallDevice';

const VaccineTable = () => {

  const {setShowFilterModal, setModalMessage} = useApp();

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
        <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-40 bg-primary px-3 py-2'>Add Vaccine</button>
      </div>
      <LargeDevice />
      <SmallDevice />
      <BasicModal open={open} element={<AddVaccine handleClose={handleClose}/>}/>
    </div>
  )
}

export default VaccineTable