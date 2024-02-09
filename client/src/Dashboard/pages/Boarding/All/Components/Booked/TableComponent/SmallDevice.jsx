import React, { useState } from 'react'
import { useBoarding } from '../../../../Hooks'
import Pagination from '@mui/material/Pagination';
import SmallTable from './SmallTable';

const SmallDevice = () => {
     const {boarders,totalPages, currentPage, setCurrentPage } = useBoarding()

  if (boarders.length==0) {
    return <h3 className='text-center p-5 text-xl'>No Data</h3>
  }

  const handlePageChange = (event, newPage) => {
     setCurrentPage(newPage);
   };

 
  return (
    <div className='lg:hidden'>
     {
          boarders.map((doc,index)=>(
               <SmallTable i={index} doc={doc}/>
          ))
     }
     <div className='flex justify-center my-3'>
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

export default SmallDevice