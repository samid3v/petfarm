import React, { useState } from 'react'
import Actions from '../Actions'
import { CiMenuKebab } from "react-icons/ci";

const TRow = ({vaccine, index}) => {

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
        <td className="p-3 border-b">{vaccine?.name}</td>
        <td className="p-3 border-b">{vaccine?.patient?.name}</td>
        <td className="p-3 border-b">{vaccine?.total_doses}</td>
        <td className="p-3 border-b">{vaccine?.doses_administered}</td>
        <td className="p-3 border-b">{vaccine?.notes}</td>

        <td className="p-3 border-b flex justify-start gap-5 items-center  "><Actions doc={vaccine}/></td>
          
      </tr>
  )
}

export default TRow