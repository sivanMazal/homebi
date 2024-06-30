import * as React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TypeUser({ setFlag }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setFlag(false); };
    const navigate = useNavigate();

    useEffect(() => {
        handleOpen();
    }, [])


    return (
        <div>
            {/* <Button onClick={handleOpen}>הרשמה</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='text-center my-5'>
                        <h2 className='m-5'>אז מי אתם?</h2>
                        <div className='row gx-0 justify-content-center'>
                            <Button className='rounded shadow col-4 center px-3 py-5 ms-5'
                                // style={{ color: "#94db9f" }}
                                onClick={() => { navigate("/admin/addAndEditBuilding"); handleClose(); }}>
                                <BusinessIcon fontSize='large' />
                                <h3>וועד בית</h3>
                            </Button>
                            <Button className='rounded shadow col-4 center px-3 py-5 me-4'
                                // style={{ color: "#94db9f" }}
                                onClick={() => { navigate("/addUser"); handleClose(); }}>
                                <PersonIcon fontSize='large' />
                                <h3>דייר בבניין</h3>
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}