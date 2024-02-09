import React from 'react'
import { Outlet } from 'react-router-dom'
import OwnerProvider from './Provider'

const Owners = () => {
  
  return (
    <OwnerProvider >
        <Outlet/>
    </OwnerProvider>
  )
}

export default Owners