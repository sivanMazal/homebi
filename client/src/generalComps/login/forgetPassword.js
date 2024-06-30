import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PasswordReset from './passwordReset';
import { Fragment } from 'react';

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

export default function ForgetPassword({ email, setOpen }) {
    const [emailClone, setEmailClone] = React.useState(email);
    const [isError, setIsError] = React.useState(true);
    const [flag, setFlag] = React.useState(false);

    const resetPassword = () => {
        // getUserByEmail(emailClone)
        //   .then(x => {
        //     if (x.data != null) {
        //       setIsError(true);
        //       setFlag(true);
        //     }
        //     else {
        //       setIsError(false);
        //       setFlag(false);
        //     }
        //   })
        //   .catch(err => console.log(err));
    }

    return <div>
        <Modal
            keepMounted
            open={true}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description">

            <Box sx={style}>
                {!flag ? <Fragment>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        <label className="small-text bold-text">הכנס כתובת מייל</label> <br />
                        <input type="text" defaultValue={email} name="Email" onChange={(e) => { setEmailClone(e.target.value); }} />
                    </Typography>
                    {!isError ? <span className='text-danger'>משתמש זה אינו קיים</span> : null}
                    <br />
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        <Button variant="contained" size="medium" onClick={resetPassword}>  איפוס סיסמא  </Button>
                    </Typography>
                </Fragment> :

                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <PasswordReset email={emailClone} setOpen={setOpen} />
                    </Typography>}
            </Box>
        </Modal>
    </div>
}
