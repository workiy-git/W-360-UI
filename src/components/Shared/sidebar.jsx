// src/components/Shared/menu.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, IconButton, Tooltip } from '@mui/material';
import { Home, People, ManageAccounts, Visibility, ChevronLeft, ChevronRight } from '@mui/icons-material';
import logo from '../../assets/images/workiy-logo-blacklogo.png';
import '../../assets/styles/style.css';  // Import the CSS file

const Sidebar = ({ userRole, onSelect }) => {
  const [selected, setSelected] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
  };

  const getIconColor = (item) => (selected === item ? '#FFFFFF' : '#c2c2c2');

  const menuItems = [
    { label: 'Home', value: 'home', icon: <Home />, roles: ['admin', 'hr', 'user'] },
    { label: 'Add Employee', value: 'employee', icon: <People />, roles: ['hr'] },
    { label: 'Manage Employee', value: 'manageEmployee', icon: <ManageAccounts />, roles: ['hr'] },
    { label: 'View Employee', value: 'viewEmployee', icon: <Visibility />, roles: ['user'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box style={{ marginTop: '100px' }}>
      <Drawer
        className="drawer"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isExpanded ? '200px' : '80px',
            transition: 'width 0.3s ease',
            padding: '10px',
            backgroundColor: '#F5F5F5', // Light background color for the sidebar
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="logoContainer"
          sx={{ padding: '10px' }}
        >
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ width: isExpanded ? '80px' : '50px', height: 'auto', transition: 'width 0.3s ease' }}
          />
        </Box>

        <List className="menuList">
          {filteredItems.map((item) => (
            <ListItem
              button
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className={`listItem ${selected === item.value ? 'listItemSelected' : ''}`}
              sx={{
                backgroundColor: selected === item.value ? '#DADEFD' : 'transparent',
                marginBottom: '10px',
                borderRadius: '10px',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                '&:hover': {
                  backgroundColor: '#E0E0E0', // Subtle hover background color
                  transform: 'scale(1.05)',
                },
                '& .MuiSvgIcon-root': {
                  color: getIconColor(item.value), // Set icon color
                  transition: 'color 0.3s ease',
                },
              }}
            >
              {item.icon}
              {isExpanded && (
                <>
                  &nbsp;&nbsp;
                  <ListItemText
                    primary={item.label}
                    sx={{ color: getIconColor(item.value), fontWeight: selected === item.value ? 'bold' : 'normal' }} // Bold for selected
                  />
                </>
              )}
            </ListItem>
          ))}
        </List>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ padding: '10px', marginTop: 'auto' }}
        >
          <Tooltip title={isExpanded ? 'Collapse' : 'Expand'}>
            <IconButton onClick={toggleExpand}>
              {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
