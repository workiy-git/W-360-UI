import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/workiy-logo-white.png';
import profilePic from '../../assets/images/positive-guy-hat-sunglasses-smil.jpg'; // Add your profile picture or icon

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic here (e.g., clear user session, tokens)
    navigate('/home'); // Navigate to login page or any other page
    handleClose(); // Close the menu
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ height: '10vh' }}>
        <AppBar
          position="fixed"
          sx={{
            background: '#212529',
            color: 'white',
            boxShadow: '0px 0px 15px #fff',
            padding: '0px 5px',
            zIndex: 3,
          }}
        >
          <Toolbar sx={{ height: '5vh', justifyContent: 'space-between' }}>
            <img src={logo} alt="logo" style={{ width: '80px' }} />

            {/* Right side profile */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt="Profile Picture"
                src={profilePic}
                onClick={handleClick}
                sx={{ cursor: 'pointer' }}
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ mt: '45px' }} // Adjust menu position if necessary
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    </Box>
  );
};

export default Header;
