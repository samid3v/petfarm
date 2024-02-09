import React from 'react'
import DashStats from './Components'
import ClinicTable from './Components/ClinicTable'
import VaccineTable from './Components/VaccineTable'

const Stats = () => {
  return (
    <div>
     <DashStats/>
     <div className='bg-white p-2 my-8 flex flex-col lg:flex-row gap-10 lg:gap-5'>
      <ClinicTable />
      <VaccineTable />
     </div>
    </div>
  )
}

export default Stats