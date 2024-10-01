import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Custom TextField component with required asterisk
const CustomTextField = ({ label, required, ...props }) => (
  <TextField
    label={label}
    {...props}
    variant="outlined"
    size="small"
    required={required}
    InputLabelProps={{
      required: required,
      sx: {
        '& .MuiInputLabel-asterisk': {
          color: 'red',
        },
      },
    }}
  />
);

const WorkExperienceForm = ({ formData = {}, handleChange, setFormData }) => {
  
  // Initialize with at least one form entry
  const [forms, setForms] = useState([]);

  useEffect(() => {
    if (formData.employeeExperienceDetails?.$values) {
      setForms(formData.employeeExperienceDetails.$values.length > 0 
        ? formData.employeeExperienceDetails.$values 
        : [
            {
              "companyName": "",
              "designation": "",
              "startDate": "",
              "duration": "",
              "endDate": "",
              "keyRole": "",
              "otherInfo": ""
            }
        ]);
    }
  }, [formData.employeeExperienceDetails]);

  // Checks if all fields in a form are filled
  const isFormComplete = (form) => {
    return (
      form.companyName &&
      form.designation &&
      form.startDate &&
      
      form.duration &&
      form.keyRole 
    );
  };

  // Disable the "Add More Experience" button if any form is incomplete
  const isAddDisabled = forms.some((form) => !isFormComplete(form));

  const handleAddForm = () => {
    setForms([...forms, {}]);
  };

  const handleRemoveForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    // handleChange({ target: { name: 'employeeExperienceDetails', value: updatedForms } });
  };

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = forms.map((form, i) =>
      i === index ? { ...form, [name]: value } : form
    );
     setFormData((prevFormData) => ({
      ...prevFormData,
      employeeExperienceDetails: {
        ...prevFormData.employeeExperienceDetails,
        $values: updatedForms
      }
    }));
    setForms(updatedForms);
    
    // handleChange({ target: { name: 'employeeExperienceDetails', value: updatedForms } });
  };

  const handleDateChange = (index, newValue, name) => {
    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
    const updatedForms = [...forms];
    updatedForms[index][name] = formattedDate;
  
    // Set start date and calculate duration based on current date
    const startDate = name === 'startDate' ? newValue : dayjs(updatedForms[index].startDate);
    const endDate = dayjs(); // Current date
  
    if (startDate) {
      calculateDuration(index, startDate, endDate, updatedForms);
    }
  
    setForms(updatedForms);
    setFormData((prevFormData) => ({
      ...prevFormData,
      employeeExperienceDetails: {
        ...prevFormData.employeeExperienceDetails,
        $values: updatedForms
      }
    }));
  };
  
  
  const calculateDuration = (index, startDate, endDate, updatedForms) => {
    const startDateObj = dayjs(startDate);
    const endDateObj = dayjs(endDate);
  
    let years = endDateObj.year() - startDateObj.year();
    let months = endDateObj.month() - startDateObj.month();
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    if (endDateObj.date() < startDateObj.date()) {
      months--;
    }
  
    const duration = years > 0 
      ? `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
      : `${months} month${months > 1 ? 's' : ''}`;
  
    updatedForms[index].duration = duration;
  };
  

  return (
    <Box
      component="form"
      sx={{
        display: 'grid',
        gap: '10px',
        width: '90%',
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px 20px 20px 20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnGap: '20px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', gridColumn: 'span 2' }}>
        <Button
          variant="contained"
          sx={{
            width: 'auto',
            padding: '6px 16px',
            backgroundColor: isAddDisabled ? '#d9d9d9' : '#ffc03d',
            color: isAddDisabled ? '#666' : '#fff',
            marginBottom: '20px',
            '&:hover': {
              backgroundColor: isAddDisabled ? '#d9d9d9' : '#ffc03d',
            },
          }}
          onClick={handleAddForm}
          disabled={isAddDisabled}
        >
          <AddIcon sx={{ mr: 1 }} /> Add More Experience
        </Button>
      </Box>

      <Typography variant="h6" sx={{ color: '#333', gridColumn: 'span 2' }}>
        Experience
      </Typography>

      {forms.map((form, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gap: '20px',
            padding: '40px 10px 10px 10px',
            background: '#f9f9f9',
            borderRadius: '8px',
            gridColumn: 'span 2',
            position: 'relative',
          }}
        >
          <CustomTextField
            label="Company Name"
            name="companyName"
            value={form.companyName || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
          />

          {index > 0 && (
            <IconButton
              onClick={() => handleRemoveForm(index)}
              sx={{
                height: '25px',
                width: '25px',
                color: '#fff',
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#d9d9d9',
                borderRadius: '50%',
                '&:hover': {
                  background: '#bfbfbf',
                },
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          )}

          <CustomTextField
            label="Designation"
            name="designation"
            value={form.designation || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={form.startDate ? dayjs(form.startDate) : null}
              onChange={(newValue) => handleDateChange(index, newValue, 'startDate')}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={form.endDate ? dayjs(form.endDate) : null}
              onChange={(newValue) => handleDateChange(index, newValue, 'endDate')}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>

          <CustomTextField
            label="Duration"
            name="duration"
            value={form.duration || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
            disabled
          />
          <CustomTextField
            label="Key Role"
            name="keyRole"
            value={form.keyRole || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
          />
          <CustomTextField
            label="Other Info"
            name="otherInfo"
            value={form.otherInfo || ''}
            onChange={(e) => handleFieldChange(index, e)}
         
            sx={{ gridColumn: 'span 1' }}
          />
        </Box>
      ))}
    </Box>
  );
};

export const validateExperienceDetails = (formData) => {
  const errors = [];

  // Ensure formData is an array
  if (!Array.isArray(formData.employeeExperienceDetails.$values)) {
    return { general: 'Experience details should be an array.' };
  }

  if (formData.employeeExperienceDetails?.$values.length === 0) {
    errors.push({
      "companyName": 'companyName is required'
    })
  }

  formData.employeeExperienceDetails.$values.forEach((form, index) => {
    const formErrors = {};

    // Company Name validation
    if (!form.companyName || form.companyName.toString().trim() === '') {
      formErrors.companyName = 'Company Name is required';
    }

    // Designation validation
    if (!form.designation || form.designation.toString().trim() === '') {
      formErrors.designation = 'Designation is required';
    }

    // Start Date validation
    if (!form.startDate || form.startDate.toString().trim() === '') {
      formErrors.startDate = 'Start Date is required';
    }

 
  

 

    // Key Role validation
    if (!form.keyRole || form.keyRole.toString().trim() === '') {
      formErrors.keyRole = 'Key Role is required';
    }

 

    // Add the errors for this form entry to the overall errors object
    if (Object.keys(formErrors).length > 0) {
      errors[index] = formErrors;
    }
  });
  
  
  console.log(errors);
  

  return errors;
};

export default WorkExperienceForm;
