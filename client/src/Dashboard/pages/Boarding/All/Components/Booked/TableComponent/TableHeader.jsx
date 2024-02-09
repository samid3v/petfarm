import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useBoarding } from '../../../../Hooks'

const THeader = () => {
  const {bookingStatus} = useBoarding()
  return (
    <thead>
    <tr>
      <th className="p-3 border-b text-left">No</th>
      <th className="p-3 border-b text-left">Patient Name</th>
      <th className="p-3 border-b text-left">Owner Name</th>
      <th className="p-3 border-b text-left">Start Date</th>
      <th className="p-3 border-b text-left">End Date</th>
      <th className="p-3 border-b text-left">Status</th>
      {bookingStatus !== 'Canceled' && <th className="p-3 border-b text-center">Actions</th>}
      {/* Add more headers as needed */}
    </tr>
  </thead>
  )
}

export default THeader