import React from 'react'
import { Outlet } from 'react-router-dom'
import VaccineProvider from './Provider'
import FilterModal from '../../components/FilterModal'

const Vaccine = () => {
  
  return (
    <VaccineProvider >
        <Outlet/>
        <FilterModal/>

    </VaccineProvider>
  )
}

export default Vaccine