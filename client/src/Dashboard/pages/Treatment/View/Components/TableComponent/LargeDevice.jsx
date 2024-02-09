import React from 'react'

import Actions from '../Actions';

const LargeDevice = ({transactions, refreshData}) => {

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
    return <div className=''>Loading...</div>
  }

  return (

        
    <div className='w-full p-4 hidden lg:block '>
      <table className=" w-full border border-gray-300 mb-3">
      <thead>
        <tr>
          <th className="p-3 border-b text-left">Amount</th>
          <th className="p-3 border-b text-left">Mpesa T.Id</th>
          <th className="p-3 border-b text-left">Bank Name</th>
          <th className="p-3 border-b text-left">Bank R.No</th>
          <th className="p-3 border-b text-left">Payment Date</th>
          <th className="p-3 border-b text-left">Pay Type</th>
          <th className="p-3 border-b text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          transactions?.map((doc, index)=>(
            <tr key={index} className={` relative ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`}>
        <td className="p-3 border-b">{doc?.amount_paid}</td>
        <td className="p-3 border-b">{doc?.mpesa_transaction_id}</td>
        <td className="p-3 border-b">{doc?.bank_name}</td>
        <td className="p-3 border-b">{doc?.bank_transaction_reference}</td>
        <td className="p-3 border-b">{humateDateFormat(doc?.payment_date)}</td>
        <td className="p-3 border-b">{doc?.payment_type}</td>
        <td className="p-3 border-b"><Actions refreshData={refreshData} doc={doc}/></td>
      </tr>
          ))
        }
      </tbody>
      </table>
      
    </div>

   
    
     
  )
}

export default LargeDevice