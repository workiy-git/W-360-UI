import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <AppBar style={{ background: '#212529', color: '#fff',top: 'auto', bottom: 0, padding:'0', minHeight:'10px'}}>
      <Toolbar    position='fixed' style={{ display: 'flex', padding:'0',justifyContent: 'center'}}>
        <Typography variant="h6" >
          © Workiy Inc
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;