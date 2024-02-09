import React from 'react'
import { useOwners } from '../../../Hooks'
import TRow from './TableRow'

const TBody = () => {

  const {customers } = useOwners()

  if (customers.length==0) {
    return <td colSpan={7} className='text-center text-xl'>No Data</td>
  }

  return (
    <tbody>
    {customers.map((owner, index) => (
      
      <TRow  key={customers._id} owner={owner} index={index} />
    ))}
  </tbody>
  )
}

export default TBody