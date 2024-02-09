import React from 'react'
import { Outlet } from 'react-router-dom'
import UserProvider from './Provider'

const Users = () => {
  
  return (
    <UserProvider >
        <Outlet/>
    </UserProvider>
  )
}

export default Users