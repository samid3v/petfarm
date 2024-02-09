import React from 'react'
import { useTreatment } from '../../../Hooks';

const Status = ({status, setMenuDisabled,id}) => {

     const {boardingState, setBoardingState, setStatusId} = useTreatment()

     const containerClasses = `bg-white absolute px-1 py-2 shadow-lg ${
          status === 'In Progress' ? 'right-24 top-14' : 'right-30 top-12'
        } transition-all duration-300 ease-in-out`;

     const statusBtnFn = (currentState)=>{
          setMenuDisabled(false)
          setBoardingState(currentState)
          setStatusId(id)
     }
 
     return (
     <div className={containerClasses}>
     <ul>
       {
          status === 'Booked' && (
               <>
                    <li onClick={()=>statusBtnFn('Canceled')} className='hover:bg-gray-100 rounded-md py-1 px-2 cursor-pointer'>Cancel</li>
                    <li onClick={()=>statusBtnFn('In Progress')} className='hover:bg-gray-100 rounded-md py-1 px-2 cursor-pointer'>In Progress</li>
               </>
          )
       }
       <li onClick={()=>statusBtnFn('Completed')} className='hover:bg-gray-100 rounded-md py-1 px-2 cursor-pointer'>Completed</li>
     </ul>
   </div>
  )
}

export default Status