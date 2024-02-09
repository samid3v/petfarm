import React from 'react'
import Actions from '../Actions'
import { useOwners } from '../../../Hooks'

const TRow = ({owner, index}) => {


  return (
    
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="p-3 border-b">{index+1}</td>
        <td className="p-3 border-b">{owner?.name}</td>
        <td className="p-3 border-b">{owner?.email}</td>
        <td className="p-3 border-b">{owner?.phone}</td>
        <td className="p-3 border-b">{owner?.county || '---'}</td>
        <td className="p-3 border-b">{owner?.sub_county || '---'}</td>
        <td className="p-3 border-b">{owner?.ward || '---'}</td>
        <td className="p-3 border-b">{owner?.street || '---'}</td>
        <td className="p-3 border-b"><Actions doc={owner}/></td>
      </tr>
  )
}

export default TRow