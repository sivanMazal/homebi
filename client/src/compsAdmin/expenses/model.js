import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddExpense from './addExpense';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Model({ year, month, onSubmit, handleClose, handleOpen, open }) {

  return (
    <div >
      <Button variant='contained' className='mx-auto' style={{ backgroundColor: "#94db9f" }}

        onClick={handleOpen}>הוסף הוצאה</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=' row gx-0 col-12'>
            <p className=' col-12 text-align-center' style={{ fontSize: "25px", textAlign: "center" }}>הוספת הוצאה</p>
          </div>
          <AddExpense
            year={year}
            month={month}
            onSubmit={onSubmit} />
        </Box>
      </Modal>
    </div>
  );
}
