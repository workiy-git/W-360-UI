import React, { useState, useEffect } from 'react';
import {
  Box,
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
  Button,
  Modal,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

// Sample employee data
const initialEmployeesData = [
  { id: 'WED009', name: 'INDIRA', designation: 'HR EXECUTIVE', email: 'hr@example.com', role: 'HR', joinDate: '01/01/2023', employmentStatus: 'ACTIVE' },
  { id: 'WED002', name: 'RONA', designation: 'ADMIN', email: 'admin@example.com', role: 'ADMIN', joinDate: '01/01/2023', employmentStatus: 'ACTIVE' },
  { id: 'WED003', name: 'BRAM', designation: 'DEVELOPER', email: 'dev@example.com', role: 'USER', joinDate: '06/01/2023', employmentStatus: 'ACTIVE' },
  { id: 'WED004', name: 'SAM', designation: 'DESIGNER', email: 'sam@example.com', role: 'USER', joinDate: '05/01/2023', employmentStatus: 'ACTIVE' },
  { id: 'WED005', name: 'LUCY', designation: 'MANAGER', email: 'lucy@example.com', role: 'USER', joinDate: '04/01/2023', employmentStatus: 'ACTIVE' },
];

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: '10px',
  fontSize: '14px',
  color: '#333',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#808080',
  '& th': {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '16px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F7F8FA',
  },
  '&:hover': {
    backgroundColor: '#ffe57f',
  },
  border: 'none',
}));

const ProfileModal = ({ open, handleClose, employee, onEdit }) => (
  <Modal open={open} onClose={handleClose} aria-labelledby="employee-profile-modal">
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: 400,
      }}
    >
      {employee ? (
        <>
          <Typography variant="h6" mb={2}>Employee Profile</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={employee.name}
            onChange={(e) => onEdit({ ...employee, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Designation"
            variant="outlined"
            fullWidth
            value={employee.designation}
            onChange={(e) => onEdit({ ...employee, designation: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={employee.email}
            onChange={(e) => onEdit({ ...employee, email: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            value={employee.role}
            onChange={(e) => onEdit({ ...employee, role: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Join Date"
            variant="outlined"
            fullWidth
            value={employee.joinDate}
            onChange={(e) => onEdit({ ...employee, joinDate: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Employment Status"
            variant="outlined"
            fullWidth
            value={employee.employmentStatus}
            onChange={(e) => onEdit({ ...employee, employmentStatus: e.target.value })}
            margin="normal"
          />
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">Close</Button>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  </Modal>
);

const AddEmployeeModal = ({ open, handleClose, onAdd }) => {
  const [newEmployee, setNewEmployee] = useState({ id: '', name: '', designation: '', email: '', role: '', joinDate: '', employmentStatus: 'ACTIVE' });

  const handleSubmit = () => {
    onAdd(newEmployee);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-employee-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography variant="h6" mb={2}>Add New Employee</Typography>
        <TextField
          label="Employee ID"
          variant="outlined"
          fullWidth
          value={newEmployee.id}
          onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Designation"
          variant="outlined"
          fullWidth
          value={newEmployee.designation}
          onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          margin="normal"
        />
        <Button onClick={handleSubmit} sx={{ mt: 2, bgcolor: '#21222f' }} variant="contained">Add Employee</Button>
        <Button onClick={handleClose} sx={{ mt: 2, ml: 1 }} variant="outlined">Cancel</Button>
      </Box>
    </Modal>
  );
};

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(initialEmployeesData);
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployeesData);
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Handle filtering logic
  useEffect(() => {
    const filtered = employees
      .filter(employee => {
        const matchesSearch = Object.values(employee).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesStatus = statusFilter === 'ALL' || employee.employmentStatus === statusFilter;

        return matchesSearch && matchesStatus;
      });

    setFilteredEmployees(filtered);
    setPage(1); // Reset to first page on search/filter
  }, [searchTerm, statusFilter, employees]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset to first page
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const paginatedEmployees = filteredEmployees.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box p={4} sx={{ backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
 
      <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            label="Search Employee"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: searchTerm && (
                <IconButton onClick={() => setSearchTerm('')}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120, marginLeft: 2 }}>
            <InputLabel>Rows Per Page</InputLabel>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              label="Rows Per Page"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)} sx={{ marginLeft: 2,background:'#212227' }}>
            Add Employee
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Join Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedEmployees.map(employee => (
              <StyledTableRow key={employee.id}>
                <StyledTableCell>{employee.id}</StyledTableCell>
                <StyledTableCell>{employee.name}</StyledTableCell>
                <StyledTableCell>{employee.designation}</StyledTableCell>
                <StyledTableCell>{employee.email}</StyledTableCell>
                <StyledTableCell>{employee.role}</StyledTableCell>
                <StyledTableCell>{employee.joinDate}</StyledTableCell>
                <StyledTableCell>{employee.employmentStatus}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleEdit(employee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredEmployees.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: 2 }}
      />
      <ProfileModal open={isModalOpen} handleClose={handleCloseModal} employee={selectedEmployee} onEdit={(updatedEmployee) => setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp))} />
      <AddEmployeeModal open={isAddModalOpen} handleClose={handleAddModalClose} onAdd={handleAddEmployee} />
    </Box>
  );
};

export default EmployeeTable;
