import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

const employeesData = [
  { id: 'WED009', name: 'INDIRA', designation: 'HR EXECUTIVE', email: 'hr@example.com', role: 'HR', joinDate: '01/01/2023', employmentStatus: 'ACTIVE' },
  { id: 'WED002', name: 'RONA', designation: 'ADMIN', email: 'admin@example.com', role: 'ADMIN', joinDate: '01/01/2023', employmentStatus: 'ACTIVE' },
  { id: 'WED009', name: 'BRAM', designation: 'DEVELOPER', email: 'dev@example.com', role: 'USER', joinDate: '06/01/2023', employmentStatus: 'ACTIVE' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f8f9fa',
  },
}));

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(employeesData);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredEmployees = employeesData.filter(employee =>
      employee.name.toLowerCase().includes(term) ||
      employee.id.toLowerCase().includes(term) ||
      employee.designation.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.role.toLowerCase().includes(term) ||
      employee.joinDate.includes(term) ||
      employee.employmentStatus.toLowerCase().includes(term)
    );
    setEmployees(filteredEmployees);
    setPage(1); // Reset to first page on search
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (employee) => {
    // Handle edit action here
    console.log('Edit employee:', employee);
  };

  const paginatedEmployees = employees.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search Employee"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
          InputProps={{
            endAdornment: searchTerm && (
              <IconButton onClick={() => handleSearch({ target: { value: '' } })}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>EMPLOYEE ID</StyledTableCell>
              <StyledTableCell>NAME</StyledTableCell>
              <StyledTableCell>DESIGNATION</StyledTableCell>
              <StyledTableCell>EMAIL ID</StyledTableCell>
              <StyledTableCell>ROLE</StyledTableCell>
              <StyledTableCell>JOINED DATE</StyledTableCell>
              <StyledTableCell>EMPLOYMENT STATUS</StyledTableCell>
              <StyledTableCell>ACTIONS</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedEmployees.length ? (
              paginatedEmployees.map((employee) => (
                <StyledTableRow key={employee.id}>
                  <StyledTableCell>{employee.id}</StyledTableCell>
                  <StyledTableCell>{employee.name}</StyledTableCell>
                  <StyledTableCell>{employee.designation}</StyledTableCell>
                  <StyledTableCell>{employee.email}</StyledTableCell>
                  <StyledTableCell>{employee.role}</StyledTableCell>
                  <StyledTableCell>{employee.joinDate}</StyledTableCell>
                  <StyledTableCell>{employee.employmentStatus}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton color="primary" onClick={() => handleEdit(employee)}>
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={8} align="center">
                  No records found
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography>Total Record Count: {employees.length}</Typography>
        <Pagination
          count={Math.ceil(employees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default EmployeeTable;
