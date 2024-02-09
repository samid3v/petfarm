import React from 'react'
import Actions from '../Actions';

const SmallDevice = ({transactions, refreshData}) => {

  const humateDateFormat = (dateString) =>{
    const formattedDate = new Date(dateString).toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi', // Nairobi is the capital of Kenya
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formattedDate
  }

  if(!transactions){
    return <div className='flex justify-center'>No data...</div>
  }

  return (
    <div className='lg:hidden'>
          {transactions?.map((doc, index)=>(
            <div key={index} className={` my-6 p-3 ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`}>
              <div className='flex justify-between items-center p-2'>
                <h1 className='text-lg font-semibold'>Amount</h1>
                <h3>{doc?.amount_paid}</h3>
              </div>
              <div className='flex justify-between items-center p-2'>
                <h1 className='text-lg font-semibold'>Mpesa T.Id</h1>
                <h3>{doc?.mpesa_transaction_id}</h3>
              </div>
              <div className='flex justify-between items-center p-2'>
                <h1 className='text-lg font-semibold'>Bank Name</h1>
                <h3>{doc?.bank_name}</h3>
              </div>
              <div className='flex justify-between items-center p-2'>
                <h1 className='text-lg font-semibold'>Bank R.No</h1>
                <h3>{doc?.bank_transaction_reference}</h3>
              </div>
              <div className='flex justify-between items-center p-2'>
                <h1 className='text-lg font-semibold'>Payment Date</h1>
                <h3>{humateDateFormat(doc?.payment_date)}</h3>
              </div>
              <div className='flex justify-between items-center p-2'>
                <h1 className='text-lg font-semibold'>Pay Type</h1>
                <h3>{doc?.payment_type}</h3>
              </div>
              <div className='flex justify-between items-center p-2'>
                <h1 className='text-lg font-semibold'>Actions</h1>
                <h3><Actions refreshData={refreshData} doc={doc}/></h3>
              </div>
            </div>
          ))}
    </div>
  )
}

export default SmallDevice