import React from 'react'
import { Outlet } from 'react-router-dom'
import PatientProvider from './Provider/PatientProvider'

const Patients = () => {
  
  return (
    <PatientProvider >
        <Outlet/>
    </PatientProvider>
  )
}

export default Patients