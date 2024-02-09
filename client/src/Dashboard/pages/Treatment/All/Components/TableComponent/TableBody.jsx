import React from 'react'
import { useTreatment } from '../../../Hooks'
import TRow from './TableRow'

const TBody = () => {

  const {treaments } = useTreatment()

  if (treaments.length==0) {
    return <td colSpan={7} className='text-center text-xl'>No Data</td>
  }

  return (
    <tbody>
    {treaments.map((treatment, index) => (
      
      <TRow  key={treatment._id} treatment={treatment} index={index} />
    ))}
  </tbody>
  )
}

export default TBody