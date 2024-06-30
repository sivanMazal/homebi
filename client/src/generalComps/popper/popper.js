import * as React from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControlLabel, Switch } from '@mui/material';
import { Fragment } from 'react';

export default function Poppers({ func, text, type, checked, setChecked, content, flag }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement != newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return (<Fragment>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        <Typography sx={{ p: 2, border: 1, bgcolor: 'background.paper', width: 200, height: 100, padding:"10px" }} className="popperP">
                            <span>האם אתה בטוח שברצונך ל{text}? </span><br />
                            <Button variant="contained" size="small" style={{ margin: "3px", backgroundColor: "#94db9f" }} onClick={func}>  כן  </Button>
                            <Button variant="contained" size="small" style={{ backgroundColor: "#94db9f" }} onClick={() => { setOpen(false) }}>  לא  </Button>
                        </Typography>
                    </Paper>
                </Fade>
            )}
        </Popper>
        {type == 1 ?
            <Button variant="contained"
                color="error"
                onClick={handleClick('bottom-end')}
                endIcon={<DeleteIcon />}>
                <span className='ms-2'> מחק </span>
            </Button>
            : type == 2 ?
                <FormControlLabel
                    control={
                        <Switch
                            onChange={() => { setChecked(!checked) }}
                            checked={checked}
                            style={{color:"#94db9f"}}
                        />
                    }
                    label={content}
                    onClick={handleClick('bottom-end')}
                />
                : type == 3 ?
                    <Button variant="contained" size="medium" style={{ backgroundColor: "orange" }} disabled={flag} onClick={handleClick('bottom-end')}>  {content}  </Button>
                    : null}
    </Fragment>
    );
}
