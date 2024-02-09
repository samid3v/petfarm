import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const THeader = () => {
  return (
    <thead>
    <tr>
      <th className="p-3 border-b text-left">Name</th>
      <th className="p-3 border-b text-left">Gender</th>
      <th className="p-3 border-b text-left">Age</th>
      <th className="p-3 border-b text-left">Weight</th>
      <th className="p-3 border-b text-left">Breed</th>
      <th className="p-3 border-b text-left">Species</th>
      <th className="p-3 border-b text-left">Owner</th>
      <th className="p-3 border-b text-center">Actions</th>
      {/* Add more headers as needed */}
    </tr>
  </thead>
  )
}

export default THeader