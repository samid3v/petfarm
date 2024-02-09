import React from 'react'
import { useTreatment } from '../../../Hooks'
import Actions from '../Actions'
import { Pagination } from '@mui/material'

const SmallDevice = () => {

  const {treaments, totalPages, currentPage, setCurrentPage } = useTreatment()

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

   if (treaments.length==0) {
     return <h3  className='text-center my-6 text-xl'>No Data</h3>
   }

  return (
    <div className='lg:hidden'>
     {
          treaments?.map((treatment, index)=>(
               <div key={index} className={` my-6 p-3 relative ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`} >
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Treatment Name</h1>
                         <h3>{treatment?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Patient Name</h1>
                         <h3>{treatment?.patient?.patient?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Vet Name</h1>
                         <h3>{treatment?.vet?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Date</h1>
                         <h3>{humateDateFormat(treatment?.date)}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Notes</h1>
                         <h3>{treatment?.notes}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Actions</h1>
                         <h3><Actions doc={treatment}/></h3>
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