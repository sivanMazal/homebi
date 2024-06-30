import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { API_URL, doApiMethodToken, doApiTokenGet } from '../../store/services/service';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { saveExpenses, updateBalance } from '../../store/features/buildingSlice';
import { useParams } from 'react-router-dom';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';
import SingleExpense from './singleExpense';
import Model from './model';
import SelectInput from '../usersPayments/selectInput';
import { useState, useEffect } from 'react';


function createData(_id, date_created, name, isConst, price, isPay, buildId) {
    return {
        _id,
        date_created,
        name,
        isConst,
        price,
        isPay,
        buildId
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'date_created',
        numeric: false,
        disablePadding: true,
        label: 'תאריך ההוצאה',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'שם ההוצאה',
    },


    {
        id: 'price',
        numeric: true,
        disablePadding: true,
        label: 'מחיר ההוצאה',
    },
    {
        id: 'isPay',
        numeric: true,
        disablePadding: true,
        label: 'האם שולם',
    },
    {
        id: 'isConst',
        numeric: true,
        disablePadding: true,
        label: 'הוצאה קבועה',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, user } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {user.role == "admin" &&
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                           <strong> {headCell.label}</strong>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { id, setNumSelected, numSelected, selected, rows, setRows, setSelected, asyncFn } = props;
    const [flag, setFlag] = React.useState(false);
    const deleteExpenses = () => {
        console.log(selected)
        selected.forEach(element => {
            try {
                const url = API_URL + "/expenses/" + element;
                const data = doApiMethodToken(url, "DELETE");
                console.log(data);
                setFlag(true);
                const vec = [...rows.filter(x => selected.indexOf(x._id) == -1)];
                setRows(vec);
                setNumSelected(0);
                setSelected([]);
                asyncFn();
            }
            catch (err) {
                console.log("קרתה שגיאה זמנית באתר")
            }
        });

    }
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} נבחרו
                </Typography>
            ) : flag ?
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h8"
                    component="div"
                >
                    <AlertMessage
                        variant={'success'}
                        setFlag={setFlag}
                        children={<Alerts message={"נמחק בהצלחה!"} />} />
                </Typography>
                : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        <h3 className=''>הוצאות הבניין</h3>
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={deleteExpenses}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function AllExpenses() {
    const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    const [years, setYears] = React.useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const { id } = useParams();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [numSelected, setNumSelected] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const expense = useSelector(state => state.expense);

    const { building, expenses, user } = useSelector(state => {
        return {
            building: state.buildingSlice.building,
            expenses: state.buildingSlice.expenses,
            user: state.userSlice.user,
        }
    }, shallowEqual)
    const dispatch = useDispatch();
    React.useEffect(() => {
        const startYear = new Date(building.dateCreated).getFullYear();
        const currentYear = new Date().getFullYear();
        const yearsArr = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
        setYears(yearsArr);
    }, []);
    useEffect(() => {
        asyncFn();
    }, [month, year]);


    const onSubmit = async (object) => {
        handleClose();
        object.buildId = building._id;
        console.log(month)
        object.date_created = new Date(year, month-1, 2).toLocaleDateString();
        console.log(object.dateCreated)
        console.log(month);
        delete object.expense;
        console.log(object);
        try {
            console.log(object.date_created);
            const url = API_URL + '/expenses/' + building._id;
            const { data } = await doApiMethodToken(url, "POST", object);
            console.log(expenses);
            const arr = [...expenses, data];
            dispatch(saveExpenses({ arr: arr }));
            if (object.isPay) {
                dispatch(updateBalance({ balance: (object.price * -1) }));
            }
            asyncFn();
        } catch (err) {
            console.log(err);
        }
    };

    const asyncFn = async () => {
        try {
            const url = API_URL + "/expenses/" + (month) + "/" + year+"/"+building._id;
            let { data } = await doApiTokenGet(url);
            let ar = [];
            let price = 0;
            data.push({ _id: 10, date_created: 'סה"כ', name: "", isConst: "", price: "", isPay: "", buildId: "" });
            data.forEach(element => {
                console.log(element.date_created)
                const date = element.date_created//new Date(new Date(element.date_created).getFullYear(), new Date(element.date_created).getMonth()+1, new Date(element.date_created).getDate())
                const item = createData(element._id, date, element.name, element.isConst, element.price, element.isPay, element.buildId);
                ar.push(item);
                price = element.price + price;
            });
            setCount(price)
            setRows([...ar]);
            dispatch(saveExpenses({ arr: data }))
        }
        catch (err) {
            console.log(err.response?.data?.msg);
        }


    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    return (
        <div className="">
            <div className='row gx-0 justify-content-center'>
                <SelectInput arr={months} name={"חודש"} value={month} setValue={setMonth} />
                <SelectInput arr={years} name={"שנה"} value={year} setValue={setYear} />
                {user.role == "admin" && <div className="mt-4 col-2" >
                    <Model
                        open={open}
                        year={year}
                        month={month}
                        onSubmit={onSubmit}
                        handleClose={handleClose}
                        handleOpen={handleOpen}
                    /> </div>}
            </div>
            <Box sx={{ width: '70%', padding: '32px', margin: "auto" }}>
                {/* {!id && <CheckAdminComp />} */}
                <Paper sx={{ width: '100%', mb: 2, padding:"24px" }}>
                    <EnhancedTableToolbar id={id} asyncFn={asyncFn} setSelected={setSelected} setNumSelected={setNumSelected} numSelected={selected.length} selected={selected} rows={rows} setRows={setRows} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                user={user}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />

                            {rows.length > 0 ? <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return <SingleExpense
                                            count={count}
                                            handleClick={handleClick}
                                            key={row._id}
                                            isItemSelected={isItemSelected}
                                            labelId={labelId}
                                            row={row} />
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody> : <p style={{ width: "10vw", padding: "24px" }}>  אין הוצאות. </p>}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 30]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
        </div>
    );
}