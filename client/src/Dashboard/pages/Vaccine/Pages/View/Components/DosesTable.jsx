import React, { useState } from 'react'
import BasicModal from '../../../../../components/Modal';
import AddDose from './AddDose';
import DoseActions from './Actions/dindex';

const DosesTable = ({ id, refreshData, docs}) => {

     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     

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
          <div className='flex justify-end'>
               <button onClick={handleOpen} type="button" className='rounded-lg text-neutral my-4 w-40 bg-primary px-3 py-2'>Add Dose</button>
          </div>
               <BasicModal open={open} element={<AddDose refreshData={refreshData} id={id} handleClose={handleClose}/>}/>

          <table class="min-w-full border border-gray-300 divide-y divide-gray-300">
               <thead>
               <tr>
                    <th class="py-2 px-4 bg-gray-200">Date</th>
                    <th class="py-2 px-4 bg-gray-200">Vet Administered</th>
                    <th class="py-2 px-4 bg-gray-200">status</th>
                    <th class="py-2 px-4 bg-gray-200">Actions</th>
               </tr>
               </thead>
               <tbody>
               {docs.length>0? docs.map((doc, index)=>(
                    <tr>
                    <td class="py-2 px-4">{humateDateFormat(doc?.date)}</td>
                    <td class="py-2 px-4">{doc?.vet.name}</td>
                    <td class="py-2 px-4">
                         <p className={`${doc?.administered? 'bg-green-500':'bg-orange-500'} text-center px-3 rounded-xl`}>{doc?.administered? 'Administered':'Pending'}</p>
                    </td>
                    <td class="py-2 px-4"><DoseActions refreshData={refreshData} doc={doc}/></td>
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

export default DosesTable