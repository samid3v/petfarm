import React from 'react'
import { useClinic } from '../../../../Hooks'
import TRow from './TableRow'

const TBody = () => {

  const {clinics } = useClinic()

  if (clinics.length==0) {
    return <td colSpan={7} className='text-center text-xl'>No Data</td>
  }

  return (
    <tbody>
    {clinics.map((clinic, index) => (
      
      <TRow  key={clinic._id} clinic={clinic} index={index} />
    ))}
  </tbody>
  )
}

export default TBody