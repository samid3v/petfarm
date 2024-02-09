import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const THeader = () => {
  return (
    <thead>
    <tr>
      <th className="p-3 border-b text-left">No</th>
      <th className="p-3 border-b text-left">Name</th>
      <th className="p-3 border-b text-left">Email</th>
      <th className="p-3 border-b text-left">Phone</th>
      <th className="p-3 border-b text-center">Actions</th>
      {/* Add more headers as needed */}
    </tr>
  </thead>
  )
}

export default THeader