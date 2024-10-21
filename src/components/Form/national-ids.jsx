import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

const FormComponent = ({ formData, setFormData }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData?.employeeNationalityDocuments?.$values) {
      formData.employeeNationalityDocuments.$values.forEach((doc) => {
        switch (doc.nationalityGpName) {
          case 'Aadhaar':
            setAadhaarNumber(doc.nationalityGpNumber || '');
            break;
          case 'Pan':
            setPanNumber(doc.nationalityGpNumber || '');
            break;
          case 'Passport':
            setPassportNumber(doc.nationalityGpNumber || '');
            break;
          default:
            break;
        }
      });
    }
  }, [formData]);

  const validatePan = (value) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return value.length !== 10 || !panRegex.test(value) ? 'PAN Number must be in the correct format (e.g., ABCDE1234F).' : '';
  };

  const validateAadhaar = (value) => {
    const aadhaarRegex = /^\d{12}$/;
    return !aadhaarRegex.test(value) ? 'Aadhaar Number must be exactly 12 digits.' : '';
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const errorMessage = validateAadhaar(value);
      setAadhaarNumber(value);
      setErrors((prev) => ({ ...prev, aadhaarNumber: errorMessage }));

      const $values = formData.employeeNationalityDocuments.$values;
      $values[1] = {
        ...$values[1],
        "nationalityGpName": "Aadhaar",
        "nationalityGpNumber": value
      }

      setFormData((prevData) => ({
        ...prevData,
        employeeNationalityDocuments: {
          ...prevData.employeeNationalityDocuments,
          $values: $values
        },
      }));
    }
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]?$/;
    let errorMessage = '';
  
    if (value.length > 10 || !panRegex.test(value)) {
      errorMessage = 'PAN Number must be in the correct format (e.g., ABCDE1234F).';
    }
    
    setPanNumber(value);
    setErrors((prev) => ({ ...prev, panNumber: errorMessage }));
  
    const $values = formData.employeeNationalityDocuments.$values;
    $values[0] = {
      ...$values[0],
      "nationalityGpName": "Pan",
      "nationalityGpNumber": value
    };
  
    setFormData((prevData) => ({
      ...prevData,
      employeeNationalityDocuments: {
        ...prevData.employeeNationalityDocuments,
        $values: $values
      },
    }));
  };

  const handlePassportChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPassportNumber(value);
     const $values = formData.employeeNationalityDocuments.$values;
     if ($values[2]) {
       $values[2] = {
         ...$values[2],
         "nationalityGpName": "Passport",
         "nationalityGpNumber": value
       }
 
       setFormData((prevData) => ({
         ...prevData,
         employeeNationalityDocuments: {
           ...prevData.employeeNationalityDocuments,
           $values: $values
         },
       }));
     } else {
      $values.push({
        "nationalityGpName": "Passport",
        "nationalityGpNumber": value,
        "nationalityGpLink": null,
        "statusInd": true,
        "createdBy": null,
        "createdDate": null,
      }
  )
       setFormData((prevData) => ({
         ...prevData,
         employeeNationalityDocuments: {
           ...prevData.employeeNationalityDocuments,
           $values: $values
         },
       }));
     }
  };

  function validateFutureDate(inputDate) {
    // Get today's date
    const today = new Date();
    // Set the time of today's date to midnight to compare only the date part
    today.setHours(0, 0, 0, 0);

    // Convert the input date to a Date object
    const dateToValidate = new Date(inputDate);
    dateToValidate.setHours(0, 0, 0, 0);

    // Check if the dateToValidate is today or a future date
    if (dateToValidate >= today) {
        return true; // Valid date
    } else {
        return false; // Invalid date
    }
  }

  const handlePassportExpiry = (e) => {

    const isValid = validateFutureDate(e.target.value);
    
    setErrors((prev) => ({ ...prev, passportExpiry: !isValid ? "Passport expiry date must be a valid date" : "" }));
  }

  const getFormattedTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
        gridColumnGap: '20px',
      }}
    >

      <TextField
        label={<span>PAN Number <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        size="small"
        fullWidth
        name="panNumber"
        value={panNumber}
        onChange={handlePanChange}
        InputProps={{ style: { height: '45px' } }}
        inputProps={{ maxLength: 10 }}
        error={!!errors.panNumber}
        helperText={errors.panNumber}
      />

      <TextField
        label={<span>Aadhaar Number <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        size="small"
        fullWidth
        name="aadhaarNumber"
        value={aadhaarNumber}
        onChange={handleAadhaarChange}
        InputProps={{ style: { height: '45px' } }}
        inputProps={{ maxLength: 12 }}
        error={!!errors.aadhaarNumber}
        helperText={errors.aadhaarNumber}
      />

      <TextField
        label={<span>Passport Number (Optional)</span>}
        variant="outlined"
        size="small"
        fullWidth
        name="passportNumber"
        value={passportNumber}
        onChange={handlePassportChange}
        InputProps={{ style: { height: '45px' } }}
        inputProps={{ maxLength: 8 }}
      />

      <TextField
        label={<span>Passport Expiry Date</span>}
        type="date"
         min={getFormattedTodayDate()}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        sx={{ gridColumn: 'span 2' }}
        onChange={handlePassportExpiry}
        error={!!errors.passportExpiry}
        helperText={errors.passportExpiry}
      />
    </Box>
  );
};

export default FormComponent;