import React from 'react';
import { usePatients } from '../../../Hooks/usePatients';
import TRow from './TableRow';
import { Skeleton } from '@mui/material';

const TBody = () => {
  const { patients } = usePatients();

  
  console.log(patients);

  return (
    <tbody>
      {patients.map((patient, index) => (
        <TRow key={patient._id} patient={patient} index={index} />
      ))}
    </tbody>
  );
}

export default TBody;
