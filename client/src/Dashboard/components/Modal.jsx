import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const BasicModal = ({element, open}) => {
  
  return (
    <>
      {open && <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
          <div className="relative no-scrollbar h-[80%] w-[80%] p-8 overflow-y-auto  rounded-lg">
            {/* Your modal content goes here */}
            {element}
          </div>
    </div>}
</>
  );
};

export default BasicModal;
