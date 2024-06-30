import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { API_URL, doApiMethodToken } from '../../store/services/service';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';
import LoadingButton from '../../generalComps/loadingButton';
import { useState } from 'react';
import { currentBuilding } from '../../store/features/buildingSlice';

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

export default function BasicModal({ index, email, setEmail, loading, setLoading, sendEmail }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState(false);
    const [message, setMessage] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const building = useSelector(state => state.buildingSlice.building);

    function validateEmail() {
        if ([...building.users].find(x => x.email == email)) {
            setMessage("קיים דייר בבניין עם אימייל זהה")
            return false;
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setMessage("כתובת המייל אינה תקינה");
            return false;
        }

        setMessage("");
    }

    const handleClick = () => {
        if (email == "") {
            return setMessage("יש להכניס כתובת מייל");
        } else if (message != "") {
            return;
        }
        sendEmail();
        registerUser();
    }


    const registerUser = async () => {
        try {
            const obj = {
                buildId: building._id,
                numApartment: index,
                email
            }
            console.log(obj)
            const url = API_URL + "/users/register"
            const { data } = await doApiMethodToken(url, "POST", obj);
            const updatedArray = [...building.users]; // Create a copy of the array
            updatedArray.push(data);
            const updatedObject = { ...building, users: updatedArray };
            dispatch(currentBuilding({ building: updatedObject }));
            console.log(data);
            setLoading(false);
            setFlag(true);
            handleClose();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='text-center'>
            <Button
                style={{ backgroundColor: "#94db9f", marginTop:"50px" }}
                variant="contained"
                onClick={handleOpen}> רישום דייר </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='text-center'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        הכנס כתובת מייל
                    </Typography>
                    <Typography id="modal-modal-description" className='text-center'>
                        <TextField id="outlined-basic"
                            variant="standard"
                            onChange={({ target }) => { setEmail(target.value); validateEmail() }} />
                        {message != "" && <p className='text-danger'>{message}</p>}
                        <LoadingButton
                            content={"שלח הודעה לרישום"}
                            loading={loading}
                            handleButtonClick={handleClick}
                        />
                        {flag && <AlertMessage
                            variant={'success'}
                            setFlag={setFlag}
                            children={<Alerts message={"התלונה עודכנה בהצלחה!"} />} />}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}