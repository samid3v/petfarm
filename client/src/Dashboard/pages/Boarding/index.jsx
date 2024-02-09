import React from 'react'
import { Outlet } from 'react-router-dom'
import BoardingProvider from './Provider'
import FilterModal from '../../components/FilterModal'

const Boarding = () => {
  
  return (
    <BoardingProvider >
        <Outlet/>
        <FilterModal/>
    </BoardingProvider>
  )
}

export default Boarding