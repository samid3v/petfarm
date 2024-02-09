import React, { useState } from 'react'
import Actions from '../Actions'
import { CiMenuKebab } from "react-icons/ci";
import Status from './Status';

const TRow = ({boarder, index}) => {

  const [menuDisabled, setMenuDisabled] = useState(false)
  
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

  return (
    
    <tr key={index} className={` relative ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`}>
        <td className="p-3 border-b">{index+1}</td>
        <td className="p-3 border-b">{boarder?.patient_id?.name}</td>
        <td className="p-3 border-b">{boarder?.patient_id?.owner?.name}</td>
        <td className="p-3 border-b">{humateDateFormat(boarder?.start_date)}</td>
        <td className="p-3 border-b">{humateDateFormat(boarder?.end_date)}</td>
        <td className="p-3 border-b flex justify-start gap-5 items-center  ">
          {boarder?.status || '---'}
          {(boarder?.status === 'In Progress' || boarder?.status == 'Booked') && 
          (
            <>
              <CiMenuKebab onClick={()=> setMenuDisabled(!menuDisabled)} className='text-xl font-semibold'/>
              {menuDisabled && <Status id={boarder._id} status={boarder?.status} setMenuDisabled={setMenuDisabled}/>}
            </>
          )
          }
          
         </td>
          
       { boarder?.status !== 'Canceled' && <td className="p-3 border-b"><Actions doc={boarder}/></td>}
      </tr>
  )
}

export default TRow