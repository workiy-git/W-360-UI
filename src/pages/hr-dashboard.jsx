import React, { useState } from 'react';
import { Container, Box,Typography } from '@mui/material';
import Sidebar from '../components/Shared/sidebar';
import Header from '../components/Shared/dashboard-header';
import Home from '../pages/Home';
import Employee from '../pages/add-emp';
import ManageEmployee from '../pages/emp-manage';
import ViewEmployee from '../pages/emp-view';
import Loader from '../pages/launchscreen'

const Dashboard = ({ user }) => {
  const [selectedView, setSelectedView] = useState('home');
  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5"><Loader/></Typography>
      </Box>
    );
  }

 
  const userRole = user.role; 

  const renderContent = () => {
   
    switch (selectedView) {
      case 'home':
        return <Home />;
      case 'employee':
        return <Employee />;
      case 'manageEmployee':
        return <ManageEmployee />;
      case 'viewEmployee':
        return <ViewEmployee />;
      default:
        return <Home />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar userRole={userRole} onSelect={setSelectedView} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Header />
        <Container maxWidth="lg">
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
