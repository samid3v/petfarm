import React from 'react'
import BoarderInfo from './Components/BoarderInfo'
import { useParams } from 'react-router-dom'

const ViewBoarding = () => {
     const {id} = useParams()
     
  return (
    <div className='bg-white p-4 rounded-md'>
       <BoarderInfo id={id} />
    </div>
  )
}

export default ViewBoarding