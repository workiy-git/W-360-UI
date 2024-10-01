import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import logo from '../../assets/images/workiy-logo-white.png';


const Header = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <div style={{height:'10vh'}}>
      <AppBar 
        position='fixed'
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
     
        </Toolbar>
      </AppBar>
      </div>
    </Box>
  );
}

export default Header;