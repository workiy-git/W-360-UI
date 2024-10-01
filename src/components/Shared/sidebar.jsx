// src/components/Shared/menu.js
import React, { useState } from 'react'; 
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Home, People, ManageAccounts, Visibility } from '@mui/icons-material';
import logo from '../../assets/images/workiy-logo-blacklogo.png';

const drawerWidth = 240;

const Sidebar = ({ userRole, onSelect }) => {
  const [selected, setSelected] = useState('');

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
  };

  const getIconColor = (item) => (selected === item ? '#FFFFFF' : '#c2c2c2');

  return (
    <Box style={{ marginTop: '100px' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            backgroundColor: '#F7F8FA',
            color: '#101820',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: '40px', width: '80px', marginTop: '10px', padding: '10px 30px 30px 30px' }}
        />
        <List style={{ marginTop: '50px' }}>
          <ListItem
            button
            onClick={() => handleSelect('home')}
            sx={{
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              transform: selected === 'home' ? 'scale(1.05)' : 'scale(1)',
              backgroundColor: selected === 'home' ? '#DADEFD' : 'transparent',
              borderLeft: selected === 'home' ? '4px solid #fff' : 'none',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#808080',
                borderLeft: '4px solid #0056b3',
              },
            }}
          >
            <Home sx={{ color: getIconColor('home') }} />
            &nbsp;&nbsp;
            <ListItemText
              primary="Home"
              sx={{ color: getIconColor('home') }}
            />
          </ListItem>
          
          {userRole === 'hr' && (
            <>
              <ListItem
                button
                onClick={() => handleSelect('employee')}
                sx={{
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                  transform: selected === 'employee' ? 'scale(1.05)' : 'scale(1)',
                  backgroundColor: selected === 'employee' ? '#DADEFD' : 'transparent',
                  borderLeft: selected === 'employee' ? '4px solid #fff' : 'none',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#808080',
                    borderLeft: '4px solid #0056b3',
                  },
                }}
              >
                <People sx={{ color: getIconColor('employee') }} />
                &nbsp;&nbsp;
                <ListItemText
                  primary="Add Employee"
                  sx={{ color: getIconColor('employee') }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleSelect('manageEmployee')}
                sx={{
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                  transform: selected === 'manageEmployee' ? 'scale(1.05)' : 'scale(1)',
                  backgroundColor: selected === 'manageEmployee' ? '#DADEFD' : 'transparent',
                  borderLeft: selected === 'manageEmployee' ? '4px solid #fff' : 'none',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#808080',
                    borderLeft: '4px solid #0056b3',
                  },
                }}
              >
                <ManageAccounts sx={{ color: getIconColor('manageEmployee') }} />
                &nbsp;&nbsp;
                <ListItemText
                  primary="Manage Employee"
                  sx={{ color: getIconColor('manageEmployee') }}
                />
              </ListItem>
              
            </>
          )}
             {userRole === 'user' && (
              <ListItem
              button
              onClick={() => handleSelect('viewEmployee')}
              sx={{
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                transform: selected === 'viewEmployee' ? 'scale(1.05)' : 'scale(1)',
                backgroundColor: selected === 'viewEmployee' ? '#DADEFD' : 'transparent',
                borderLeft: selected === 'viewEmployee' ? '4px solid #fff' : 'none',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: '#808080',
                  borderLeft: '4px solid #0056b3',
                },
              }}
            >
              <Visibility sx={{ color: getIconColor('viewEmployee') }} />
              &nbsp;&nbsp;
              <ListItemText
                primary="View Employee"
                sx={{ color: getIconColor('viewEmployee') }}
              />
            </ListItem>
             )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
