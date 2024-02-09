import React from 'react'
import { useVaccine } from '../../../../Hooks'
import Actions from '../Actions'
import { Pagination } from '@mui/material'

const SmallDevice = () => {
     const {vaccines,  totalPages, currentPage, setCurrentPage } = useVaccine()

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

  if (vaccines.length==0) {
    return <h3 className='text-center text-xl'>No Data</h3>
  }

  const handlePageChange = (event, newPage) => {
     setCurrentPage(newPage);
   };


  return (
    <div className='lg:hidden'>
     {
          vaccines.map((vaccine, index)=>(
               <div key={index} className={` my-6 p-3 relative ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`} >
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>vaccine Name</h1>
                         <h3>{vaccine?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Patient Name</h1>
                         <h3>{vaccine?.patient?.name}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Total Doses</h1>
                         <h3>{vaccine?.total_doses}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Doses Given</h1>
                         <h3>{vaccine?.doses_administered}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Notes</h1>
                         <h3>{vaccine?.notes}</h3>
                    </div>
                    <div className='flex justify-between items-center p-2'>
                         <h1 className='text-lg font-semibold'>Actions</h1>
                         <h3><Actions doc={vaccine}/></h3>
                    </div>
               </div>
          ))
     }
     <Pagination 
        count={totalPages} 
        variant="outlined" 
        color="primary" 
        onChange={handlePageChange}
        page={currentPage}
      />
    </div>
  )
}

export default SmallDevice