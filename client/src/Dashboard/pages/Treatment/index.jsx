import React from 'react'
import { Outlet } from 'react-router-dom'
import TreatmentProvider from './Provider'
import FilterModal from '../../components/FilterModal'

const Treatment = () => {
  
  return (
    <TreatmentProvider >
        <Outlet/>
        <FilterModal/>

    </TreatmentProvider>
  )
}

export default Treatment