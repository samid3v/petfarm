import React from 'react'
import Actions from '../Actions'
import { Pagination } from '@mui/material'
import { useUsers } from '../../../Hooks'

const SmallDevice = () => {

  const {customers, totalPages, currentPage, setCurrentPage } = useUsers()


   const handlePageChange = (event, newPage) => {
     setCurrentPage(newPage);
   };

   if (customers.length==0) {
     return <h3  className='text-center lg:hidden py-6 text-xl'>No Data</h3>
   }

  return (
    <div className='lg:hidden'>
     {
          customers?.map((owner, index)=>(
               <div key={index} className={` my-6 p-3 relative ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`} >
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Name</h1>
                         <h3>{owner?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Email</h1>
                         <h3>{owner?.email}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Phone</h1>
                         <h3>{owner?.phone}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Actions</h1>
                         <h3>{owner.role==='employee' && <Actions doc={owner}/>}</h3>
                    </div>
                    
               </div>
          ))
     }
     <div className='flex justify-center my-4'>
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