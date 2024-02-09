import React, { useEffect } from 'react';
import { useApp } from '../../../../hooks/useApp';
import { useOwners } from '../../Hooks';
import { GiCancel } from "react-icons/gi";
import Loader from '../../../../components/Loader';

const ViewCustomer = ({handleClose}) => {

  const { setModalOpen, setModalMessage   } = useApp()
  const { currentCustomer } = useOwners()

  if (!currentCustomer || currentCustomer.length === 0) {
     return (
          <div></div>
     );
   }

 


  return (
    <div className='flex justify-center items-center'>
     <div className='bg-white w-[100%] p-3 overflow-x-hidden relative rounded-md shadow-xl'>
      <GiCancel onClick={handleClose} className='absolute right-4 text-xl  hover:text-red-600' />
      <h3 className='text-xl font-semibold my-3'>View Customer</h3>
      <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-3 sm:gap-6'>
          <div className='my-4'>
               <h3><span className='mr-2 font-semibold'>Name:</span><span>{currentCustomer.name}</span></h3>
               <h3><span className='mr-2 font-semibold'>Email:</span><span>{currentCustomer.email}</span></h3>
               <h3><span className='mr-2 font-semibold'>Phone:</span><span>{currentCustomer.phone}</span></h3>
          </div>
          <div className='my-4'>
               <h3><span className='mr-2 font-semibold'>County:</span><span>{currentCustomer?.county}</span></h3>
               <h3><span className='mr-2 font-semibold'>Sub-County:</span><span>{currentCustomer?.sub_county}</span></h3>
               <h3><span className='mr-2 font-semibold'>Ward:</span><span>{currentCustomer?.ward}</span></h3>
          </div>
      </div>
      <div class="hidden sm:block">
        <h3>No Of Pets: {currentCustomer.patients.length}</h3>
    <table class="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b text-left">Name</th>
          <th class="py-2 px-4 border-b text-left">Age</th>
          <th class="py-2 px-4 border-b text-left">Breed</th>
          <th class="py-2 px-4 border-b text-left">Species</th>
        </tr>
      </thead>
      <tbody>
        {
          currentCustomer.patients.map((patient,index)=>(
            <tr>
              <td class="py-2 px-4 border-b">{patient?.name}</td>
              <td class="py-2 px-4 border-b">{patient?.age}</td>
              <td class="py-2 px-4 border-b">{patient?.breed}</td>
              <td class="py-2 px-4 border-b">{patient?.species}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
    </div>
    
    </div>
  );
};

export default ViewCustomer;
