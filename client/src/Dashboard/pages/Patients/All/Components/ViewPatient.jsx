import React, { useEffect } from 'react';
import { useApp } from '../../../../hooks/useApp';
import { usePatients } from '../../Hooks/usePatients';
import { GiCancel } from "react-icons/gi";
import Loader from '../../../../components/Loader';

const ViewPatient = ({handleClose}) => {

  const { setModalOpen, setModalMessage   } = useApp()
  const { currentPatient } = usePatients()

  if (!currentPatient || currentPatient.length === 0) {
     return (
          <div></div>
     );
   }


  return (
    <div className='flex justify-center w-full  items-center'>
     <div className='bg-white w-full p-3 overflow-x-hidden relative rounded-md shadow-xl'>
      <GiCancel onClick={handleClose} className='absolute right-4 text-xl  hover:text-red-600' />
      <h3 className='text-xl font-semibold my-3'>View Patient</h3>
      <div>
          <div className='my-4'>
               <h3><span className='mr-2 font-semibold'>owner:</span><span>{currentPatient.owner.name}</span></h3>

          </div>
          <div className='flex justify-between items-center'>
               <h3><span className='mr-2 font-semibold'>Name:</span><span>{currentPatient.name}</span></h3>
               <h3><span className='mr-2 font-semibold'>Age:</span><span>{currentPatient.age}</span></h3>
               <h3><span className='mr-2 font-semibold'>Weight:</span><span>{currentPatient.weight}</span></h3>
          </div>
          <div className='flex justify-start items-center gap-10 mt-4'>
               <h3><span className='mr-2 font-semibold'>Breed:</span><span>{currentPatient.breed}</span></h3>
               <h3><span className='mr-2 font-semibold'>Species:</span><span>{currentPatient.species}</span></h3>
          </div>
      </div>
    </div>
    </div>
  );
};

export default ViewPatient;
