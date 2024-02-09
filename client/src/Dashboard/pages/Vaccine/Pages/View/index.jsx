import React from 'react'
import { useParams } from 'react-router-dom'
import VaccineInfo from './Components/VaccineInfo'

const ViewVaccine = () => {
     const {id} = useParams()
     
  return (
    <div className='bg-white p-4 rounded-md'>
       <VaccineInfo id={id} />
    </div>
  )
}

export default ViewVaccine