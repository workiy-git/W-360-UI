import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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

const DegreeForm = ({ formData = {}, handleChange, setFormData }) => {
  const [forms, setForms] = useState([{ degree: '', nameOfTheDegree: '', major: '', institute: '', yearOfCompletion: '' }]);

  useEffect(() => {
    if (formData?.employeeEducationalDetails?.$values) {
      setForms(formData.employeeEducationalDetails.$values.length > 0 
        ? formData.employeeEducationalDetails.$values 
        : [{ degree: '', nameOfTheDegree: '', major: '', institute: '', yearOfCompletion: '' }]);
    }
  }, [formData]);

  const isFormComplete = (form) => {
    return (
      form.degree &&
      form.nameOfTheDegree &&
      form.major &&
      form.institute &&
      form.yearOfCompletion
    );
  };

  const isAddDisabled = forms.some((form) => !isFormComplete(form));

  const handleAddForm = () => {
    setForms([...forms, { degree: '', nameOfTheDegree: '', major: '', institute: '', yearOfCompletion: '' }]);
  };

  const handleRemoveForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    setFormData((prevFormData) => ({
      ...prevFormData,
      employeeEducationalDetails: {
        ...formData.employeeEducationalDetails,
        $values: updatedForms
      }
    }));
  };

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = forms.map((form, i) =>
      i === index ? { ...form, [name]: value } : form
    );
    setForms(updatedForms);
    setFormData((prevFormData) => ({
      ...prevFormData,
      employeeEducationalDetails: {
        ...formData.employeeEducationalDetails,
        $values: updatedForms
      }
    }));
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
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        gridTemplateColumns: 'repeat(2, 1fr)',
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
          <AddIcon sx={{ mr: 1 }} /> Add Additional Degree
        </Button>
      </Box>

      <Typography variant="h6" sx={{ color: '#333', gridColumn: 'span 2' }}>
        Degree Information
      </Typography>

      {forms.map((form, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gap: '20px',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '8px',
            gridColumn: 'span 2',
            position: 'relative',
          }}
        >
          <CustomTextField
            select
            label="Degree"
            name="degree"
            value={form.degree || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
          >
            <MenuItem value="UG">UG</MenuItem>
            <MenuItem value="PG">PG</MenuItem>
            <MenuItem value="Doctorate">Doctorate</MenuItem>
          </CustomTextField>

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
            label="Name of the Degree"
            name="nameOfTheDegree"
            value={form.nameOfTheDegree || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
          />

          <CustomTextField
            label="Major"
            name="major"
            value={form.major || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
          />

          <CustomTextField
            label="Name of the Institution"
            name="institute"
            value={form.institute || ''}
            onChange={(e) => handleFieldChange(index, e)}
            required
            sx={{ gridColumn: 'span 1' }}
          />

<CustomTextField
  label="Year of Completion"
  name="yearOfCompletion"
  type="date"
  value={form.yearOfCompletion || ''}
  onChange={(e) => handleFieldChange(index, e)}
  required
  sx={{ gridColumn: 'span 1' }}
  InputLabelProps={{
    shrink: true,
    sx: {
      // Styles to apply when input is focused
      '&.Mui-focused': {
        color: 'blue', // Change label color on focus
        fontWeight: 'bold', // Make label bold on focus
      },
    },
  }}
  inputProps={{
    max: new Date().toISOString().split('T')[0], // Prevent future dates
  }}
/>

        </Box>
      ))}
    </Box>
  );
};

export const validateEducationInfo = (formData) => {
  const errors = [];

  // Ensure the educational details are an array
  const educationDetails = Array.isArray(formData?.employeeEducationalDetails?.$values)
    ? formData.employeeEducationalDetails.$values
    : [];

  console.log('Employee Educational Details:', educationDetails);

  // if (educationDetails.length == 0) {
  //   errors.push({
  //     "degree": 'Degree is required'
  //   })
  // }

  educationDetails.forEach((education, index) => {
    const entryErrors = {};

    // Degree validation
    if (!education.degree || education.degree.toString().trim() === '') {
      entryErrors.degree = 'Degree is required';
    }

    // Name of the Degree validation
    if (!education.nameOfTheDegree || education.nameOfTheDegree.toString().trim() === '') {
      entryErrors.nameOfTheDegree = 'Name of the Degree is required';
    }

    // Major validation
    if (!education.major || education.major.toString().trim() === '') {
      entryErrors.major = 'Major is required';
    }

    // Institute validation
    if (!education.institute || education.institute.toString().trim() === '') {
      entryErrors.institute = 'Institute is required';
    }

    // Year of Completion validation
  if (!education.yearOfCompletion || education.yearOfCompletion.toString().trim() === '') {
      entryErrors.yearOfCompletion = 'Year of Completion is required';
    } else {
      const yearRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!yearRegex.test(education.yearOfCompletion)) {
        entryErrors.yearOfCompletion = 'Year of Completion must be in the format YYYY-MM-DD';
      } else {
        // Optionally, convert the date to YYYY-MM-DD format if it's in a different format
        const formattedDate = new Date(education.yearOfCompletion).toISOString().split('T')[0];
        education.yearOfCompletion = formattedDate;
      }
    }

    // If there are any errors for this entry, assign them to the correct index
    if (Object.keys(entryErrors).length > 0) {
      errors[`education_${index}`] = entryErrors;
    }
  });

  console.log('Validation Errors:', errors);

  return errors;
};

export default DegreeForm;