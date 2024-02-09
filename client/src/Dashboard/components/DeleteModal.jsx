import React from 'react';
import { useApp } from '../hooks/useApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';


const DeleteModal = ({open, handleClose, deleteFunc}) => {

     
  const { showDeleteModal, setShowDeleteModal,setConfirmDelete } = useApp();
  
  //  console.log(showDeleteModal)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    border:'none',
    p: 4,
  };
  const btn = {
    bgcolor:"#007d68",
    color: "#fff9fc"
  }
  return (
      
      <Modal
  open={open}
  // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete?
          </Typography>
          <div className='mt-6 flex justify-between items-center'>
          <Button variant='contained' sx={{bgcolor:"#191e1b"}} onClick={handleClose}>Close</Button>
          <Button onClick={deleteFunc} sx={btn} variant='contained'>Confirm</Button>
          </div>
        </Box>
</Modal>
  );
};

export default DeleteModal;
