import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function InfoAlert({open, setOpen}) {

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
        severity="info"
          sx={{ mb: 2, me:1 }}
        >
            <p className='me-1 fw-bold'>הבהרה</p>
            <p> קוד הבניין נשלח אליך לתיבת המייל לאחר שוועד הבית הוסיף את פרטיך במערכת.  <br/> אם טרם קיבלת את ההודעה, פנה לוועד הבית בבניינך. </p>
        </Alert>
      </Collapse>
    </Box>
  );
}