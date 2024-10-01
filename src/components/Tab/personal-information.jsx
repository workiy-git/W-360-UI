import React from 'react';
import { Container, Typography, Paper, Grid, Box, Button } from '@mui/material';

const UserProfile = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    fatherName: "Richard",
    dateOfBirth: "1990-05-25",
    age: 34,
    gender: "Male",
    bloodGroup: "A-",
    maritalStatus: "Married",
    mobileNo: "9876543210",
    personalMail: "john.doe@example.com"
  };

  return (
    <Container style={{}}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <div style={{display:'flex',justifyContent:'end'}}>
       <Button style={{background:'#c2c2c2', color:'#212529',fontWeight:'700',boxShadow:'2px 2px 10px #c2c2c2'}}>EDit</Button>
       </div>
        <Grid container spacing={2}>
          {Object.entries(user).map(([key, value]) => (
            <Grid item xs={12} key={key}>
              <Typography variant="body1">
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
