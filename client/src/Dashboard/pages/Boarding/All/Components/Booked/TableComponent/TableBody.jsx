import React from 'react'
import { useBoarding } from '../../../../Hooks'
import TRow from './TableRow'

const TBody = () => {

  const {boarders } = useBoarding()

  if (boarders.length==0) {
    return <td colSpan={7} className='text-center text-xl'>No Data</td>
  }

  return (
    <tbody>
    {boarders.map((boarder, index) => (
      
      <TRow  key={boarder._id} boarder={boarder} index={index} />
    ))}
  </tbody>
  )
}

export default TBody