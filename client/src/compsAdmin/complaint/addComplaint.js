import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SendComplaint from './sendComplaint';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddComplaint({ addComplaint, updateComplaint, handleClose, open, setOpen }) {
    const handleOpen = () => setOpen(true);

    return (
        <div className='mb-4 text-start'>
            <Button onClick={handleOpen} variant='contained' style={{ backgroundColor: "#94db9f" }}> הוסף פניה </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SendComplaint handleClose={handleClose}
                        addComplaint={addComplaint}
                        updateComplaint={updateComplaint} />
                </Box>
            </Modal>
        </div>
    );
}