import React from 'react'
import { Outlet } from 'react-router-dom'
import ClinicProvider from './Provider'
import FilterModal from '../../components/FilterModal'

const Clinic = () => {
  
  return (
    <ClinicProvider >
        <Outlet/>
        <FilterModal/>

    </ClinicProvider>
  )
}

export default Clinic