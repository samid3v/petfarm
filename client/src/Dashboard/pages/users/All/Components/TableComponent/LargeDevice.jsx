import React from 'react'
import { useUsers } from '../../../Hooks'
import Pagination from '@mui/material/Pagination';

import THeader from './TableHeader';
import TBody from './TableBody';

const LargeDevice = () => {

  const {patients, totalPages, currentPage, setCurrentPage} = useUsers()

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (

        
    <div className='w-full p-4 hidden lg:block '>
      <table className=" w-full border border-gray-300 mb-3">
        <THeader/>
        <TBody/>
      </table>
      <div className='flex justify-center items-center my-3 '>

      <Pagination 
        count={totalPages} 
        variant="outlined" 
        color="primary" 
        onChange={handlePageChange}
        page={currentPage}
      />
      </div>
    </div>

   
    
     
  )
}

export default LargeDevice