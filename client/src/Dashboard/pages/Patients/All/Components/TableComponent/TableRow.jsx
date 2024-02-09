import React from 'react'
import Actions from '../Actions'

const TRow = ({patient, index}) => {


  return (
    
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="p-3 border-b">{patient?.name}</td>
        <td className="p-3 border-b">{patient?.gender}</td>
        <td className="p-3 border-b">{patient?.age>1? patient?.age+' '+patient?.a_unit+'s':patient?.age+' '+patient?.a_unit }</td>
        <td className="p-3 border-b">{patient?.weight>1? patient?.weight+' '+patient?.w_unit+'s':patient?.weight+' '+patient?.w_unit }</td>
        <td className="p-3 border-b">{patient?.breed}</td>
        <td className="p-3 border-b">{patient?.species}</td>
        <td className="p-3 border-b">{patient?.owner?.name}</td>
        <td className="p-3 border-b"><Actions doc={patient}/></td>
      </tr>
  )
}

export default TRow