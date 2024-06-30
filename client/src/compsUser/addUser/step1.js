import { TextField } from '@mui/material';
import React, { useState } from 'react'
import InfoAlert from './infoAlert';

const Step1 = ({ setEmail, setBuildId }) => {
    const [open, setOpen] = React.useState(true);

    return (
        <div className="p-5">
            <div className='row gx-0 justify-content-around'>
                <div className="col-md-6">
                    <label>אימייל</label> <br />
                    <TextField id="standard-basic" variant="standard" onChange={({ target }) => setEmail(target.value)} />
                    <br /> <br />
                    <label>קוד בניין</label> <br />
                    <TextField id="standard-basic" variant="standard" onChange={({ target }) => setBuildId(target.value)} />
                </div>
                <div className="col-md-4">
                    <InfoAlert open={open} setOpen={setOpen} />
                </div>
            </div>
        </div>
    )
}

export default Step1;