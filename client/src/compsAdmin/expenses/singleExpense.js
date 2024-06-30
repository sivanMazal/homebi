import { Checkbox, FormControlLabel, TableCell, TableRow } from '@mui/material';
import React from 'react'
import Poppers from '../../generalComps/popper/popper';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';
import { API_URL, doApiMethodToken } from '../../store/services/service';
import { useDispatch, useSelector } from 'react-redux';
import { updateBalance } from '../../store/features/buildingSlice';

const SingleExpense = ({ row, isItemSelected, labelId, handleClick, count }) => {
    const [checked, setChecked] = React.useState(row.isPay);
    const [flag, setFlag] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.userSlice.user);

    const changeExpense = async () => {
        try {
            setFlag(true);
            const url = API_URL + "/expenses/changePay/" + row._id;
            const { data } = await doApiMethodToken(url, "PATCH");
            console.log(data);
            const price = checked ? (row.price * -1) : row.price;
            console.log(price);
            dispatch(updateBalance({ balance: price }));
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row._id}
            selected={isItemSelected}
        >
            {user.role == "admin" && <TableCell padding="checkbox"
                sx={{ cursor: 'pointer' }}
                onClick={(event) => handleClick(event, row._id)}
            >
                {row._id != 10 && <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />}
            </TableCell>}
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
            >
                {row._id != 10 && new Date(row.date_created).toLocaleDateString()}
            </TableCell>
            <TableCell align="right">{row._id != 10 && row.name}</TableCell>
            <TableCell align="right">{row._id != 10 && row.price}</TableCell>
            {user.role == "admin" && row._id != 10 ? <> <TableCell>
                {!flag ? <Poppers
                    type={2}
                    func={changeExpense}
                    text="שנות את התשלום"
                    checked={checked}
                    content={checked ? "שולם" : "לא שולם"}
                    setChecked={setChecked}
                /> : row._id != 10 ?
                    <AlertMessage
                        setFlag={setFlag}
                        variant={'success'}
                        children={<Alerts message={"התשלום שונה בהצלחה!"} />} /> : null}
            </TableCell>  </> : user.role == "admin" && row._id==10?
            <TableCell> סה"כ </TableCell> 
            : row._id != 10 ? <TableCell>
                {checked ? "שולם" : "לא שולם"}
            </TableCell> : <TableCell> סה"כ </TableCell>}

            <TableCell align="right">{row._id != 10 && row.isConst ? "קבוע" : row._id != 10 ? "לא קבוע" : count}</TableCell>

        </TableRow>

    );
}

export default SingleExpense