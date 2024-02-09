import React from 'react'
import Actions from '../Actions'
import { Pagination } from '@mui/material'
import { usePatients } from '../../../Hooks/usePatients'

const SmallDevice = () => {

  const {patients, totalPages, currentPage, setCurrentPage } = usePatients()

  const humateDateFormat = (dateString) =>{
     const formattedDate = new Date(dateString).toLocaleString('en-US', {
       timeZone: 'Africa/Nairobi', // Nairobi is the capital of Kenya
       year: 'numeric',
       month: 'long',
       day: 'numeric',
       hour: 'numeric',
       minute: 'numeric',
       second: 'numeric',
     });
 
     return formattedDate
   }

   const handlePageChange = (event, newPage) => {
     setCurrentPage(newPage);
   };

   if (patients.length==0) {
     return <h3  className='text-center my-6 text-xl'>No Data</h3>
   }

  return (
    <div className='lg:hidden'>
     {
          patients?.map((patient, index)=>(
               <div key={index} className={` my-6 p-3 relative ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`} >
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Name</h1>
                         <h3>{patient?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Age</h1>
                         <h3>{patient?.age}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Breed</h1>
                         <h3>{patient?.breed}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Species</h1>
                         <h3>{patient?.species}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Owner</h1>
                         <h3>{patient?.owner?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Actions</h1>
                         <h3><Actions doc={patient}/></h3>
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