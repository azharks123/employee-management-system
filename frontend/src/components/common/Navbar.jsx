import {useState} from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { CONST, handleLogout } from "../../utils/constants";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem(CONST.USER_NAME);
  const [menu, setMenu] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setMenu(menu)
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenu('')
  };

  const handleNavigate = (route) => {
    navigate(route);
    handleMenuClose();
  };  

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          EMS
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body1">{userName}</Typography>
          <Button
            color="inherit"
            onClick={(e) => handleMenuOpen(e, 'view')}
            aria-controls={anchorEl ? "view-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? "true" : undefined}
          >
            View
          </Button>
          <Menu
            id="view-menu"
            anchorEl={anchorEl}
            open={menu === 'view'}
            onClose={handleMenuClose}
            MenuListProps={{ "aria-labelledby": "view-button" }}
          >
            <MenuItem onClick={() => handleNavigate('/forms')}>
              Forms
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/employees')}>
              Employees
            </MenuItem>
          </Menu>
          <Button
            color="inherit"
            onClick={(e) => handleMenuOpen(e, 'create')}
            aria-controls={anchorEl ? "add-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? "true" : undefined}
          >
            <AddCircleIcon />
          </Button>
          <Menu
            id="add-menu"
            anchorEl={anchorEl}
            open={menu === 'create'}
            onClose={handleMenuClose}
            MenuListProps={{ "aria-labelledby": "view-button" }}
          >
            <MenuItem onClick={() => handleNavigate('/forms/create')}>
              Create Form
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/employees/create')}>
              Create Employee
            </MenuItem>
          </Menu>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
