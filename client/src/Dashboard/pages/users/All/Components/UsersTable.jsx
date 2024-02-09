import React, { useState } from 'react'
import { useApp } from '../../../../hooks/useApp';
import LargeDevice from './TableComponent/LargeDevice';
import BasicModal from '../../../../components/Modal';
import AddOwner from './AddUser';
import SmallDevice from './TableComponent/SmallDevice';
import { useUsers } from '../../Hooks';
import AddUser from './AddUser';

const UsersTable = () => {

  const {setModalOpen, setModalMessage, isModalOpen, modalMessage} = useApp();
  const {searchTerm, setSearchTerm} = useUsers()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  return (
    <div className=''>
     <div className='flex flex-col sm:flex-row justify-between gap-2 p-6  '>
        <input className='w-full py-1 px-2 rounded-lg outline-none border-[1px] border-black' type="text" name="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search...' />
        <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-36 bg-primary px-3 py-2'>Add User</button>
      </div>
      <LargeDevice />
      <SmallDevice />
      <BasicModal open={open} element={<AddUser handleClose={handleClose}/>}/>
    </div>
  )
}

export default UsersTable