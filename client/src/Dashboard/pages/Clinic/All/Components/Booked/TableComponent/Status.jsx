import React from 'react'
import { useClinic } from '../../../../Hooks';

const Status = ({status, setMenuDisabled,id}) => {

     const {clinicState, setClinicState, setStatusId} = useClinic()

     const containerClasses = `bg-white absolute px-1 py-2 shadow-lg lg:top-0 lg:right-48 top-36 right-10
        transition-all duration-300 ease-in-out`;

     const statusBtnFn = (currentState)=>{
          setMenuDisabled(false)
          setClinicState(currentState)
          setStatusId(id)
     }
 
     return (
     <div className={containerClasses}>
     <ul>
       {
          status === 'Booked' && (
               <>
                    <li onClick={()=>statusBtnFn('Canceled')} className='hover:bg-gray-100 rounded-md py-1 px-2 cursor-pointer'>Cancel</li>
               </>
          )
       }
       <li onClick={()=>statusBtnFn('Completed')} className='hover:bg-gray-100 rounded-md py-1 px-2 cursor-pointer'>Completed</li>
     </ul>
   </div>
  )
}

export default Status