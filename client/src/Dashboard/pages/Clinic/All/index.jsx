import React from 'react'
import ClinicCards from './Components/ClinicCards'
import ClinicTable from './Components/Booked/ClinicTable'

const AllClinics = () => {

  return (
    <>
      <ClinicCards />
      <div className='bg-white  '>
        <ClinicTable/>
      </div>
    </>
  )
}

export default AllClinics