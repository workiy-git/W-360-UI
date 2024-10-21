import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel, Divider, Typography } from '@mui/material';

const AddNewEmployeeForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log({
      employeeId, name, designation, email, role, dateOfJoining, status
    });
  };

  return (
    <Box>
      <Typography variant="h6">Add New Employee</Typography>
      <Divider style={{ margin: '20px 0' }} />
      <form>
        <TextField
          label="Employee ID"
          fullWidth
          margin="normal"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Designation"
          fullWidth
          margin="normal"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <TextField
          label="Email ID"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date of Joining"
          fullWidth
          margin="normal"
          type="date"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-select-label">Employment Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Employment Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: 10 }}>Save</Button>
          <Button variant="outlined" color="secondary">Cancel</Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewEmployeeForm;
