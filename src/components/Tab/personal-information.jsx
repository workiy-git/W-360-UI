import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Avatar, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({
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
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Trigger the popup when Save is clicked
      setOpen(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false); // Switch back to view mode after sending the request
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        {/* Header Section with Profile Picture and Edit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, marginRight: 3, backgroundColor: '#f0f0f0' }}>
              <Typography variant="h6" sx={{ color: '#6c757d' }}>
                {user.firstName[0]}{user.lastName[0]}
              </Typography>
            </Avatar>
            <Box>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  label="First Name"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  sx={textFieldStyle}
                />
              ) : (
                <Typography variant="h5" fontWeight="600" color="text.primary">
                  {user.firstName} {user.lastName}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {user.personalMail}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isEditing ? '#fff' : '#fff',
              color: '#ffc03d',
              padding:'2px 6px',
              textTransform: 'none',
              fontWeight: '500',
              boxShadow: 'none',
              border:' 2px solid #ffc03d',
              '&:hover': {
                backgroundColor: isEditing ? '#fff' : '#fff'
              }
            }}
            onClick={toggleEditMode}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </Button>
        </Box>

        {/* User Information Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InfoRow
              isEditing={isEditing}
              label="Father's Name"
              value={user.fatherName}
              name="fatherName"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              isEditing={isEditing}
              label="Date of Birth"
              value={user.dateOfBirth}
              name="dateOfBirth"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              isEditing={isEditing}
              label="Age"
              value={user.age}
              name="age"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              isEditing={isEditing}
              label="Gender"
              value={user.gender}
              name="gender"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              isEditing={isEditing}
              label="Blood Group"
              value={user.bloodGroup}
              name="bloodGroup"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              isEditing={isEditing}
              label="Marital Status"
              value={user.maritalStatus}
              name="maritalStatus"
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              isEditing={isEditing}
              label="Mobile No"
              value={user.mobileNo}
              name="mobileNo"
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to send the updated profile information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// Custom style for TextField
const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderBottom: '2px solid #dff2ff',
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none'
    },
    '&:hover fieldset': {
      borderBottom: '2px solid #0056b3',
    },
    '&.Mui-focused fieldset': {
      borderBottom: '2px solid #28a745',
    },
  },
  '& label': {
    color: '#6c757d',
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: '0.85rem',
  },
  '& label.Mui-focused': {
    color: '#28a745',
  }
};

// Helper component for each row of user information
const InfoRow = ({ label, value, isEditing, name, handleChange }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
    {isEditing ? (
      <TextField
        variant="outlined"
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        size="small"
        sx={textFieldStyle}
        fullWidth
      />
    ) : (
      <>
        <Typography variant="body2" fontWeight="600" color="text.primary" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      </>
    )}
  </Box>
);

export default UserProfile;
