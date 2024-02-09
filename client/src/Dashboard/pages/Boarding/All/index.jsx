import React from 'react'
import BookingTable from './Components/Booked/BoardingTable'
import BookingCards from './Components/BookingCards'

const AllBoarders = () => {

  return (
    <>
      <BookingCards />
      <div className='bg-white  '>
        <BookingTable/>
      </div>
    </>
  )
}

export default AllBoarders