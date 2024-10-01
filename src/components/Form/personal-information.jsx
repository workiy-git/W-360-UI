import React, { useState, useEffect } from 'react';
import {
  TextField,
  
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import dayjs from 'dayjs';

const PersonalInfoForm = ({ formData, handleChange, setFormData }) => {

  const [, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const today = new Date();
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
  const formattedMaxDate = maxDate.toISOString().split('T')[0];
  useEffect(() => {
    if (formData.dateOfBirth) {
      const age = calculateAge(formData.dateOfBirth);
      setFormData((prevData) => ({ ...prevData, age }));
    }
  }, [formData.dateOfBirth, setFormData]);

  const calculateAge = (dob) => {
    const birthDate = dayjs(dob);
    const currentDate = dayjs();
    let age = currentDate.year() - birthDate.year();
    if (
      currentDate.month() < birthDate.month() ||
      (currentDate.month() === birthDate.month() && currentDate.date() < birthDate.date())
    ) {
      age--;
    }
    return age;
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;

    // Improved regex pattern for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Known domains for typo checks
    

    let errorMessage = '';

    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address, such as example@gmail.com.';
    }

    console.log('Email Value:', value);
    console.log('Error Message:', errorMessage);

    // Update state with the validated email and errors
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: errorMessage }));

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      personalMail: value,
    }));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Additional validation for mobileNumber field
    if (name === 'mobileNumber') {
      if (!/^\d{0,10}$/.test(value)) {
        return; // Prevent entering more than 10 digits
      }
    }

    // Clear the error while typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    // Validate mobile number on blur
    if (name === 'mobileNumber') {
      if (value.length !== 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobileNumber: 'Mobile Number must be exactly 10 digits',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobileNumber: undefined,
        }));
      }
    }

    // Validate personal email on blur
    if (name === 'personalEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          personalEmail: 'Please enter a valid email address (e.g., example@gmail.com)',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          personalEmail: undefined,
        }));
      }
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with form submission or next steps
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Form submission failed due to validation errors:', validationErrors);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gap: '10px',
        width: '90%',
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnGap: '20px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', gridColumn: 'span 2' }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: '80px' }}>
          <InputLabel>Title</InputLabel>
          <Select
            label="Title"
            name="prefix"
            value={formData.prefix || ''}
            onChange={(e) => {
              console.log('Selected Value:', e.target.value); // Debug log
              handleChange(e);
            }}
          >
            <MenuItem value="Mr.">Mr</MenuItem>
            <MenuItem value="ms">Ms</MenuItem>
            <MenuItem value="miss">Miss</MenuItem>
            <MenuItem value="Dr.">Dr.</MenuItem>
          </Select>

        </FormControl>

        <TextField
          label={
            <span>
              First Name <span style={{ color: 'red' }}>*</span>
            </span>
          }

          variant="outlined"
          size="small"
          fullWidth
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          InputProps={{ style: { height: '45px' } }}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <TextField
          label={
            <span>
              Last Name <span style={{ color: 'red' }}>*</span>
            </span>
          }
          variant="outlined"
          size="small"
          fullWidth
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          InputProps={{ style: { height: '45px' } }}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
      </Box>

      <TextField
        label={
          <span>
            Father Name <span style={{ color: 'red' }}>*</span>
          </span>
        }

        variant="outlined"
        size="small"
        fullWidth
        name="fatherName"
        value={formData.fatherName || ''}
        onChange={handleInputChange}
        onBlur={handleBlur}
        id="outlined-start-adornment"
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.fatherName)}
        helperText={errors.fatherName}
      />

<FormControl variant="outlined" size="small" fullWidth error={Boolean(errors.dateOfBirth)}>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth || ''}
        onChange={handleInputChange}
        onBlur={handleBlur}
        InputLabelProps={{ shrink: true }}
        InputProps={{ style: { height: '45px' } }}
        inputProps={{ max: formattedMaxDate }} // Disable dates greater than maxDate
      />
    </FormControl>
      <TextField
        label={<span>Age <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        size="small"
        fullWidth
        value={formData.age || ''}
        disabled
        InputProps={{ style: { height: '45px' } }}
      />

      <TextField
        label={<span>Blood Group</span>}
        variant="outlined"
        size="small"
        fullWidth
        name="bloodGroup"
        value={formData.bloodGroup || ''}
        onChange={handleInputChange}
        onBlur={handleBlur}
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.bloodGroup)}
        helperText={errors.bloodGroup}
      />

      <TextField
        label={
          <span>
            Mobile No <span style={{ color: 'red' }}>*</span>
          </span>
        }

        variant="outlined"
        size="small"
        fullWidth
        name="mobileNo"
        disabled
        value={formData.mobileNo || ''}
        onChange={handleInputChange}
        onBlur={handleBlur}
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.mobileNumber)}
        helperText={errors.mobileNumber}
      />

      <FormControl component="fieldset" required sx={{ gridColumn: 'span 2' }}>
        <Typography variant="body1">
          Gender <span style={{ color: 'red' }}>*</span>
        </Typography>
        <RadioGroup
          row
          name="gender"
          required
          value={formData.gender || ''}
          onChange={handleInputChange}
          sx={{ justifyContent: 'space-around' }}
        >
          <FormControlLabel
            value="Male"
            control={
              <Radio
                sx={{ color: '#ffc03d', '&.Mui-checked': { color: '#ffc03d' } }}
              />
            }
            label="Male"
          />
          <FormControlLabel
            value="Female"
            control={
              <Radio
                sx={{ color: '#ffc03d', '&.Mui-checked': { color: '#ffc03d' } }}
              />
            }
            label="Female"
          />
        </RadioGroup>
        {errors.gender && <Typography color="error">{errors.gender}</Typography>}
      </FormControl>

      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel>
          Marital Status <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <Select

          label={
            <span>
              Marital Status <span style={{ color: 'red' }}>*</span>
            </span>
          }
          required
          name="maritalStatus"
          value={formData.maritalStatus || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={Boolean(errors.maritalStatus)}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
        </Select>
        {errors.maritalStatus && (
          <Typography color="error">{errors.maritalStatus}</Typography>
        )}
      </FormControl>
      <TextField
        label={
          <span>
            Personal Email ID <span style={{ color: 'red' }}>*</span>
          </span>
        }
        variant="outlined"
        size="small"
        fullWidth
        name="personalMail"
        value={formData.personalMail || ''} // Make sure this is used to control the field value
        onChange={handleEmailChange}
        onBlur={handleBlur}
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

    </Box>
  );
};
export const validate = (data) => {
  const validationErrors = {};

  // Required Fields Validation
  if (!data.firstName || data.firstName.toString().trim() === '') {
    validationErrors.firstName = 'First Name is required';
  }

  if (!data.lastName || data.lastName.toString().trim() === '') {
    validationErrors.lastName = 'Last Name is required';
  }

  if (!data.fatherName || data.fatherName.toString().trim() === '') {
    validationErrors.fatherName = 'Father Name is required';
  }

  if (!data.dateOfBirth || data.dateOfBirth.toString().trim() === '') {
    validationErrors.dateOfBirth = 'Date of Birth is required';
  }

  if (!data.mobileNo || data.mobileNo.toString().trim() === '') {
    validationErrors.mobileNo = 'Mobile Number is required';
  } else if (data.mobileNo.length !== 10) {
    validationErrors.mobileNo = 'Mobile Number must be exactly 10 digits';
  }

  if (!data.gender || data.gender.toString().trim() === '') {
    validationErrors.gender = 'Gender is required';
  }

  if (!data.maritalStatus || data.maritalStatus.toString().trim() === '') {
    validationErrors.maritalStatus = 'Marital Status is required';
  }

  if (!data.personalMail || data.personalMail.toString().trim() === '') {
    validationErrors.personalMail = 'Email address is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.personalMail)) {
      validationErrors.personalMail = 'Please enter a valid email address (e.g., example@gmail.com)';
    }
  }
    // Age Validation
  if (!data.age || data.age.toString().trim() === '') {
    validationErrors.age = 'Age is required';
  } else if (isNaN(data.age) || Number(data.age) <= 18) {
    validationErrors.age = 'Age must be greater than 18';
  }

  return validationErrors;
};

export default PersonalInfoForm;