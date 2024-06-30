import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PersonalDetails from './personalDetails';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import PasswordDetails from './passwordDetails';

export default function ButtomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <div className='col-6 mx-auto'>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
             
            >
                <BottomNavigationAction label="עדכון פרטים אישיים" icon={<PersonIcon />} />
                <BottomNavigationAction label="עדכון סיסמא" icon={<LockIcon />} />
            </BottomNavigation>

            {value == 0 ? <PersonalDetails /> : <PasswordDetails />}
        </div>
    );
}

