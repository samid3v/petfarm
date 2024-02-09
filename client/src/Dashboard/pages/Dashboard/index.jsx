import React from 'react'
import Stats from './Stats'
import DashProvider from './Provider'

const Dash = () => {
  return (
    <DashProvider >
      <Stats />
    </DashProvider>
  )
}

export default Dash
