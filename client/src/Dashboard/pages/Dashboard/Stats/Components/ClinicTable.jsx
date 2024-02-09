import React, { useState } from 'react'
import useDash from '../../Hooks';

const ClinicTable = () => {

     const {upcomingAppointments} = useDash()
     

     const humateDateFormat = (dateString) =>{
          const formattedDate = new Date(dateString).toLocaleString('en-US', {
            timeZone: 'Africa/Nairobi', // Nairobi is the capital of Kenya
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
      
          return formattedDate
        }
  return (
     <div class="overflow-x-auto">
          <h3 className='py-3 font-semibold text-center'>Upcoming Appointments</h3>
          <table class="min-w-full border border-gray-300 divide-y divide-gray-300">
               <thead>
               <tr>
                    <th class="py-2 px-4 bg-gray-200">Reason</th>
                    <th class="py-2 px-4 bg-gray-200">Vet</th>
                    <th class="py-2 px-4 bg-gray-200">Patient</th>
                    <th class="py-2 px-4 bg-gray-200">Date</th>
               </tr>
               </thead>
               <tbody>
               {upcomingAppointments.length>0? upcomingAppointments.map((event, index)=>(
                    <tr>
                         <td class="py-2 px-4">{event?.reason}</td>
                         <td class="py-2 px-4">{event?.vet.name}</td>
                         <td class="py-2 px-4">{event?.patient.name}</td>
                         <td class="py-2 px-4">{humateDateFormat(event?.date)}</td>
                    </tr>
               )): <tr>
                    <td className='text-center py-3 font-semibold text-lg' colSpan={4}>No Data</td>
               </tr>
               }
               </tbody>
          </table>
     </div>
  )
}

export default ClinicTable