import { Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Fragment } from "react";

const FormInput = ({ register, errors, name, lableName, type, flag, width, user }) => {

    return <Fragment> {type != "checkbox" ?
        <TextField id="standard-basic"
            label={lableName}
            name={name}
            type={type}
            {...register(name)}
            variant="standard"
            disabled={flag}
            defaultValue={user? user[name]: null}
            style={{  width: width ? width : null }} />
        : <FormControlLabel
            label={lableName}
            name={name}
            {...register(name)}
            disabled={flag}
            control={<Checkbox defaultChecked />} />}
            
        <p className='text-danger'>{errors[name]?.message}</p>
    </Fragment>
}
export default FormInput;