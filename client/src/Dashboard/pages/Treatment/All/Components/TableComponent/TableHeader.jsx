import React from 'react'

const THeader = () => {
  return (
    <thead>
    <tr>
      <th className="p-3 border-b text-left">Treatment Name</th>
      <th className="p-3 border-b text-left">Patient Name</th>
      <th className="p-3 border-b text-left">Vet Name</th>
      <th className="p-3 border-b text-left">Date</th>
      <th className="p-3 border-b text-left">Notes</th>
      <th className="p-3 border-b text-center">Actions</th>
      {/* Add more headers as needed */}
    </tr>
  </thead>
  )
}

export default THeader