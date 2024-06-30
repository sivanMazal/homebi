import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { logoutBuilding } from '../../store/features/buildingSlice';
import { logoutUser } from '../../store/features/userSlice';
import { TOKEN_NAME } from '../../store/services/service';
import { ListItemIcon } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [arr, setArr] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let { user, balance, building } = useSelector(state => {
    return {
      user: state.userSlice.user,
      balance: state.buildingSlice.balance,
      building: state.buildingSlice.building,
    }
  }, shallowEqual);

  const disconnected = async () => {
    localStorage.removeItem(TOKEN_NAME);
    dispatch(logoutUser());
    dispatch(logoutBuilding());
    navigate("/");

  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setArr([
      { name: "פרופיל", to: "/user/profile", icon: <PersonIcon fontSize='small'/>, role: ["user", "admin"] },
      { name: "עריכת בניין", to: "/admin/addAndEditBuilding/", icon: <EditIcon fontSize='small'/>, role: ["admin"] },
      // { name: "האטרקציות שלי", to: "/attractionsList/" + 1, icon: <StoreIcon />, role: [1] },
      // { name: "הזמנות לקוחות", to: "/orderList/" + 1, icon: <PersonAdd fontSize="small" />, role: [1] },
      // { name: "אישורי לקוחות", to: "/usersApprovals", icon: <ApprovalIcon />, role: [1] },
      // { name: "הוספת אטרקציה", to: "/editAttraction", icon: <AddCircleOutlineIcon fontSize="small" />, role: [1, 2] },
      // { name: "עריכת אודות", to: "/about/edit", icon: <BuildIcon fontSize="small" />, role: [2] },
      // { name: "אפשרויות נוספות", to: "/reportsList", icon: <Settings fontSize="small" />, role: [2] },
    ]);
  }, [building])

  return (
    arr.length>0 && <Box sx={{ flexGrow: 0}}>
      <Tooltip title="פתח הגדרות">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} style={{ backgroundColor: "#f0f0f0" }} className="px-2 py-1">
          <div> {user.fullName.firstName[0]}{user.fullName.lastName[0]}</div>
          {/* <div> אא</div> */}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
       {arr.map(x => {
          return x.role.map(item => {
            if (item == user.role) return <MenuItem onClick={() =>{handleCloseUserMenu(); navigate(`${x.to}`)}}>
              {x.icon}  {x.name}
            </MenuItem>
          })
        })}

          <MenuItem style={{cursor:"text"}}>
            {/* <ListItemIcon> */}
              <AttachMoneyIcon fontSize="small" />
            {/* </ListItemIcon> */}
           יתרה {balance}
          </MenuItem>

          <MenuItem onClick={disconnected}>
            {/* <ListItemIcon> */}
              <Logout fontSize="small" />
            {/* </ListItemIcon> */}
            התנתק\י
          </MenuItem>

      </Menu>
    </Box >
  );
}
export default ResponsiveAppBar;