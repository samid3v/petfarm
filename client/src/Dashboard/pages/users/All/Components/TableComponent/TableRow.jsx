import React from 'react'
import Actions from '../Actions'
import { useApp } from '../../../../../hooks/useApp'

const TRow = ({owner, index}) => {

  const {user} = useApp()

  return (
    
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="p-3 border-b">{index+1}</td>
        <td className="p-3 border-b">{owner?.name}</td>
        <td className="p-3 border-b">{owner?.email}</td>
        <td className="p-3 border-b">{owner?.phone}</td>
        <td className="p-3 border-b">
          {owner.role!==user?.user?.role && <Actions doc={owner}/>}
          </td>
      </tr>
  )
}

export default TRow