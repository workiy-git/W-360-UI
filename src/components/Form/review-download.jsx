import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/info'); // Redirect to the "info" page
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      bgcolor="#f9f9f9"
      p={3}
    >
      <CheckCircleIcon style={{ fontSize: 80, color: 'green' }} />
      <Typography variant="h5" component="h2"  style={{color:'#34A853'}}mt={2}>
        Form Submitted Successfully!
      </Typography>
      <Button
        variant="contained"
      style={{background:'#34A853', marginTop: 20}}
        onClick={handleOkClick}
   
      >
        OK
      </Button>
    </Box>
  );
};

export default SuccessPage;
