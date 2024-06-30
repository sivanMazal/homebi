import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function SelectTextFields({ handleChange, currencies, text }) {
  const [currency, setCurrency] = useState(currencies[0].Id);
  // useEffect(() => { }, [currency])
  return (
  <div className='filter-container'>
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .MuiButtonBase-root': { display: "flex", flexDirection: "column" }
      }}
      noValidate
      autoComplete="off">

      <TextField
        id="standard-select-currency"
        select
        label={text}
        value={currency}
        onChange={({ target }) => { setCurrency(target.value); handleChange({ target }); }}
        variant="standard" >

        {currencies.length > 0 ? currencies.map(option => (
          <MenuItem key={option.Id} value={option.Id}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {option.Name}
          </MenuItem>
        )) : null}

      </TextField>
    </Box>
  </div>
  );
}
