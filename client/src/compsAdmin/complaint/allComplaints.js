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
import { saveComplaints } from '../../store/features/buildingSlice';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../../generalComps/alerts/alertMessage';
import Alerts from '../../generalComps/alerts/alerts';
import "./allComplaints.css";
import CheckAdminComp from '../checkAdminComp';
import AddComplaint from './addComplaint';
import swal from 'sweetalert';

function createData(_id, date_created, userName, description, isHandled, image, video) {
    return {
        _id,
        date_created,
        userName,
        description: description ? description.substring(0, 25) + "..." : null,
        isHandled,
        image,
        video
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
        label: 'תאריך התלונה',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: true,
        label: 'שם דייר',
    },
    {
        id: 'description',
        numeric: true,
        disablePadding: true,
        label: 'תיאור התלונה',
    },
    {
        id: 'isHandled',
        numeric: true,
        disablePadding: true,
        label: 'האם טופל',
    },
    {
        id: '',
        numeric: true,
        disablePadding: true,
        label: 'פרטים נוספים',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
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
                </TableCell>
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
                              {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                            <strong>{headCell.label}</strong>
                          
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
    const { setNumSelected, numSelected, selected, rows, setRows, setSelected } = props;
    const [flag, setFlag] = React.useState(false);
    const deleteComplaints = () => {
        console.log(selected)
        selected.forEach(element => {
            try {
                const url = API_URL + "/complaints/" + element;
                const data = doApiMethodToken(url, "DELETE");
                // dispatch(changeAttractionStatus(id));
                console.log(data);
                setFlag(true);
                const vec = [...rows.filter(x => selected.indexOf(x._id) == -1)];
                setRows(vec);
                setNumSelected(0);
                setSelected([]);
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
                        <h3>פניות</h3>
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={deleteComplaints}>
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

export default function AllComplaints() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [numSelected, setNumSelected] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const { building, user } = useSelector(state => {
        return {
            building: state.buildingSlice.building,
            user: state.userSlice.user
        }
    }, shallowEqual)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        asyncFn();
    }, [user]);

    const asyncFn = async () => {
        let url;
        console.log(user)
        if (user.role != "admin") {
            url = API_URL + "/complaints/" + user._id;
        } else {
            url = API_URL + "/complaints/byBuild/" + building._id;
        }
        const { data } = await doApiTokenGet(url);
        let ar = [];

        data.forEach(element => {
            const item = createData(element._id, element.date_created, element.userId?.fullName?.firstName + " " + element.userId?.fullName?.lastName, element.description, element.isHandled, element.image, element.video);
            ar.push(item);
        });
        console.log(data)
        setRows([...ar]);
        dispatch(saveComplaints({ arr: data }))
    };


    const updateComplaint = async (obj, id) => {
        try {
            const url = API_URL + "/complaints/" + id;
            const { data } = await doApiMethodToken(url, "PUT", obj);
            console.log(data);
            swal({
                icon: "success",
                title: "סיימנו!",
                text: "התלונה עודכנה בהצלחה.",
                button: "סגור",
            }).then(() => handleClose())
            asyncFn();
        }
        catch (err) {
            console.log("קרתה שגיאה זמנית באתר")
        }
    }

    const addComplaint = async (obj) => {
        try {
            const url = API_URL + "/complaints";
            const { data } = await doApiMethodToken(url, "POST", obj);
            console.log(data);
            swal({
                icon: "success",
                title: "סיימנו!",
                text: "התלונה נשלחה בהצלחה.",
                button: "סגור",
            }).then(() => (handleClose()))
            asyncFn();

        }
        catch (err) {
            console.log("קרתה שגיאה זמנית באתר")
        }
    }

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
        <Box sx={{ width: '70%', padding: '32px', margin: "auto" }}>
            <AddComplaint addComplaint={addComplaint}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                updateComplaint={updateComplaint} />
            <Paper sx={{ width: '100%', mb: 2 , padding:"24px" }}>
                <EnhancedTableToolbar setSelected={setSelected} setNumSelected={setNumSelected} numSelected={selected.length} selected={selected} rows={rows} setRows={setRows} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
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

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={(event) => handleClick(event, row._id)}
                                            >
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {new Date(row.date_created).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="right">{row.userName}</TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right">{row.isHandled ? "טופל" : "לא טופל"}</TableCell>
                                            <TableCell align="right"
                                                role="button"
                                                className='link'
                                                onClick={() => navigate(`/user/singleComplaint/${row._id}/${user._id}` )}>
                                                לחץ כאן </TableCell>
                                        </TableRow>
                                    );
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
                        </TableBody> : <p style={{ width: "10vw", padding: "24px" }}>  אין תלונות. </p>}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}