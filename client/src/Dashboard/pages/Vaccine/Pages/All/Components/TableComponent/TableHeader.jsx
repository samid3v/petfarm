import React from 'react'

const THeader = () => {
  return (
    <thead>
    <tr>
      <th className="p-3 border-b text-left">Vaccine Name</th>
      <th className="p-3 border-b text-left">Patient Name</th>
      <th className="p-3 border-b text-left">Total Doses</th>
      <th className="p-3 border-b text-left">Doses Given</th>
      <th className="p-3 border-b text-left">Notes</th>
      <th className="p-3 border-b text-center">Actions</th>
      {/* Add more headers as needed */}
    </tr>
  </thead>
  )
}

export default THeader