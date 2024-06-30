import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import "../../css/message.css";
import { useState } from 'react';

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

export default function AddMessage({ addMessage, value, type }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <>
      {type == "edit" ? <EditIcon onClick={handleOpen} style={{cursor:"pointer"}}/>
        : <AddCircleIcon style={{ color: '#94db9f', cursor:"pointer" }} fontSize='large' onClick={handleOpen} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center">
          <Typography id="modal-modal-title" variant="h6" component="h2" className='mb-3'>
            {type == "edit" ? "ערוך הודעה" : "הכנס הודעה"}
          </Typography>
          <Typography id="modal-modal-description" className='text-center'>

            <textarea className="nicely-styled-textarea"
              placeholder="הכנס כאן..."
              defaultValue={value?value.description:null}
              onChange={({ target }) => setMessage(target.value)} />
            <br />
            <Button variant="contained"
              disabled={message == ""}
              style={{ backgroundColor: "#94db9f", marginTop: "24px", color: "white" }}
              onClick={() => { handleClose(); addMessage(message, value); }}
            >
              {type=="edit"? "עדכן" : "הוסף"} 
            </Button>

          </Typography>
        </Box>
      </Modal >
    </>
  );
}