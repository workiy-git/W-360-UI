// src/components/Home.js
import React from 'react';
import { Paper, Typography } from '@mui/material';

const Home = () => {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">Home</Typography>
      <Typography>Welcome to the home page!</Typography>
    </Paper>
  );
};

export default Home;
