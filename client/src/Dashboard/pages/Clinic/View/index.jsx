import React from 'react'
import ClinicInfo from './Components/ClinicInfo'
import { useParams } from 'react-router-dom'

const ViewClinic = () => {
     const {id} = useParams()
     
  return (
    <div className='bg-white p-4 rounded-md'>
       <ClinicInfo id={id} />
    </div>
  )
}

export default ViewClinic