import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useClinic } from '../../../../Hooks'

const THeader = () => {
  const {bookingStatus} = useClinic()
  return (
    <thead>
    <tr>
      <th className="p-3 border-b text-left">Patient Name</th>
      <th className="p-3 border-b text-left">Vet Name</th>
      <th className="p-3 border-b text-left">Date</th>
      <th className="p-3 border-b text-left">Reason</th>
      <th className="p-3 border-b text-left">Status</th>
      {bookingStatus !== 'Canceled' && <th className="p-3 border-b text-center">Actions</th>}
      {/* Add more headers as needed */}
    </tr>
  </thead>
  )
}

export default THeader