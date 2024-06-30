import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectInput({ name, arr, value, setValue,flag }) {

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className='col-md-2 '>
            <FormControl variant="standard" sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">{name}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label={name}
                >
                    {/* <MenuItem value="">
                        <em>None</em>
                    </MenuItem> */}
                    {arr.map((item, index) =>
                        <MenuItem value={name == "חודש" ? index + 1 : item} key={index}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}