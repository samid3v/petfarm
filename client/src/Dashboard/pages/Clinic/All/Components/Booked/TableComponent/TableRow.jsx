import React, { useState } from 'react'
import Actions from '../Actions'
import { CiMenuKebab } from "react-icons/ci";
import Status from './Status';

const TRow = ({clinic, index}) => {

  const [menuDisabled, setMenuDisabled] = useState(false)
  
  const humateDateFormat = (dateString) =>{
    const formattedDate = new Date(dateString).toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi', // Nairobi is the capital of Kenya
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formattedDate
  }

  return (
    
    <tr key={index} className={` relative ${ index % 2 === 0 ? 'bg-gray-100' : ''  }`}>
        <td className="p-3 border-b">{clinic?.patient?.name}</td>
        <td className="p-3 border-b">{clinic?.vet?.name}</td>
        <td className="p-3 border-b">{humateDateFormat(clinic?.date)}</td>
        <td className="p-3 border-b">{ clinic?.reason }</td>
        <td className="p-3 border-b flex justify-start gap-5 items-center  ">
          {clinic?.status || '---'}
          {(clinic?.status == 'Booked') && 
          (
            <>
              <CiMenuKebab onClick={()=> setMenuDisabled(!menuDisabled)} className='text-xl font-semibold'/>
              {menuDisabled && <Status id={clinic._id} status={clinic?.status} setMenuDisabled={setMenuDisabled}/>}
            </>
          )
          }
          
         </td>
          
       { clinic?.status !== 'Canceled' && <td className="p-3 border-b"><Actions doc={clinic}/></td>}
      </tr>
  )
}

export default TRow