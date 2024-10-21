import React, {  useState } from 'react';
import { TextField, Box, Typography, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';

const AddressForm = ({ formData, handleChange, setFormData }) => {
   const [sameAddress, setSameAddress] = useState('no');
  const [errors, setErrors] = useState({});


  const formdataddressdetail = {
    ...formData?.employeeAddressDetails?.$values?.[0],
    addressType: formData?.employeeAddressDetails?.$values?.[0]?.addressType || "temporary"
  } || {};
  
  const formdataddressdetail2 = {
    ...formData?.employeeAddressDetails?.$values?.[1],
    addressType: formData?.employeeAddressDetails?.$values?.[1]?.addressType || "permanent"
  } || {};
  const formdataContactDetails = formData?.employeeContactDetails?.$values?.[0] || {};

  const handlePincodeChange = (e, source = 'temporary') => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      temporaryAddressChange(e, source);
    }
  };


  const validateField = (name, value) => {
    let error = '';
    if (name === 'country' && value === 'USA') {
      if (formdataddressdetail.state === 'British Columbia') {
        error = 'British Columbia is not a valid state for USA';
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const temporaryAddressChange = (e, source = 'temporary') => {
    const { name, value } = e.target;
    validateField(name, value);
  
    setFormData((prevData) => {
      const temporaryAddress = {
        ...prevData.employeeAddressDetails?.$values[0],
        [name]: value,
        addressType: "temporary"
      };
  
      const updatedPermanentAddress = sameAddress === 'yes'
        ? { ...prevData.employeeAddressDetails?.$values[1], [name]: value }
        : prevData.employeeAddressDetails?.$values[1];
  
      return {
        ...prevData,
        employeeAddressDetails: {
          ...prevData.employeeAddressDetails,
          $values: [temporaryAddress, updatedPermanentAddress],
        },
      };
    });
  };
  

  const handleEmergencyContactNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      handleContactChange(e);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedContactDetails = [{ ...prevData.employeeContactDetails.$values[0], [name]: value }];
      return {
        ...prevData,
        employeeContactDetails: {
          ...prevData.employeeContactDetails,
          $values: updatedContactDetails,
        },
      };
    });
  };

  const handleSameAddressChange = (e) => {
    const value = e.target.value;
    setSameAddress(value);

    if (value === 'yes') {
      setFormData((prevData) => ({
        ...prevData,
        employeeAddressDetails: {
          ...prevData.employeeAddressDetails,
          $values: [
            { ...prevData.employeeAddressDetails?.$values[0] },
            {
              ...prevData.employeeAddressDetails?.$values[1],
              address1: formdataddressdetail.address1,
              address2: formdataddressdetail.address2,
              city: formdataddressdetail.city,
              state: formdataddressdetail.state,
              country: formdataddressdetail.country,
              pincode: formdataddressdetail.pincode,
              area: formdataddressdetail.area,
            },
          ],
        },
        employeeContactDetails: {
          ...prevData.employeeContactDetails,
          $values: [
            { ...prevData.employeeContactDetails?.$values[0] },
            {
              ...prevData.employeeContactDetails?.$values[1],
              permEmergencyContactName: formdataContactDetails.emergencyConName,
              permEmergencyContactNumber: formdataContactDetails.conNum,
              permEmergencyContactRelationship: formdataContactDetails.relation,
            },
          ],
        },
      }));
    } else if (value === 'no') {
      setFormData((prevData) => ({
        ...prevData,
        employeeAddressDetails: {
          ...prevData.employeeAddressDetails,
          $values: [
            { ...prevData.employeeAddressDetails?.$values[0] },
            {
              address1: '',
              address2: '',
              city: '',
              state: '',
              country: '',
              pincode: '',
              area: '',
            },
          ],
        },
        employeeContactDetails: {
          ...prevData.employeeContactDetails,
          $values: [
            { ...prevData.employeeContactDetails?.$values[0] },
            {
              permEmergencyContactName: '',
              permEmergencyContactNumber: '',
              permEmergencyContactRelationship: '',
            },
          ],
        },
      }));
    }
  };

  const permanentAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      // const permanentAddress = { ...prevData.employeeAddressDetails?.$values[1], [name]: value };
      const permanentAddress = {
        ...prevData.employeeAddressDetails?.$values[1],
        [name]: value,
        addressType: "permanent"
      };

      return {
        ...prevData,
        employeeAddressDetails: {
          ...prevData.employeeAddressDetails,
          $values: [prevData.employeeAddressDetails.$values[0], permanentAddress],
        },
      };
    });
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
      <Typography variant="h6" sx={{ gridColumn: 'span 2' }}>Temporary Address</Typography>

      <TextField
        label={<span>Address 1 <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="address1"
        value={formdataddressdetail.address1 || ''}
        onChange={(e) => temporaryAddressChange(e)}
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>Address 2 <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="address2"
        value={formdataddressdetail.address2 || ''}
        onChange={(e) => temporaryAddressChange(e)}
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>Area <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="area"
        value={formdataddressdetail.area || ''}
        onChange={(e) => temporaryAddressChange(e)}
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>City <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="city"
        value={formdataddressdetail.city || ''}
        onChange={(e) => temporaryAddressChange(e)}
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>State <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="state"
        value={formdataddressdetail.state || ''}
        onChange={(e) => temporaryAddressChange(e)}
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.state)}
        helperText={errors.state}
      />
      <TextField
        label={<span>Country <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="country"
        value={formdataddressdetail.country || ''}
        onChange={(e) => temporaryAddressChange(e)}
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.country)}
        helperText={errors.country}
      />
      <TextField
        label={<span>Pincode <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="pincode"
        value={formdataddressdetail.pincode || ''}
        onChange={(e) => handlePincodeChange(e)}
        InputProps={{ style: { height: '45px' } }}
      />
       <TextField
        label={<span>Emergency Contact Name <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="emergencyConName"
        value={formdataContactDetails.emergencyConName || ''}
        onChange={handleContactChange}
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>Relation <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="relation"
        value={formdataContactDetails.relation || ''}
        onChange={handleContactChange}
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>Emergency Contact Number <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="conNum"
        value={formdataContactDetails.conNum || ''}
        onChange={handleEmergencyContactNumberChange}
        InputProps={{ style: { height: '45px' } }}
      />
      <FormLabel component="legend">Is Permanent Address same as Temporary Address?</FormLabel>
      <RadioGroup
        row
        aria-label="sameAddress"
        name="sameAddress"
        value={sameAddress}
        onChange={handleSameAddressChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>

      <Typography variant="h6" sx={{ gridColumn: 'span 2' }}>Permanent Address</Typography>

      <TextField
        label={<span>Address 1 <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="address1"
        value={formdataddressdetail2.address1|| ''}
        onChange={permanentAddressChange} 
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>Address 2 <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="address2"
        value={formdataddressdetail2.address2 || ''}
        onChange={permanentAddressChange} 
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>Area <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="area"
        value={formdataddressdetail2.area || ''}
        onChange={permanentAddressChange} 
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>City <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="city"
        value={formdataddressdetail2.city || ''}
        onChange={permanentAddressChange} 
        InputProps={{ style: { height: '45px' } }}
      />
      <TextField
        label={<span>State <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="state"
        value={formdataddressdetail2.state || ''}
        onChange={permanentAddressChange} 
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.state)}
        helperText={errors.state}
      />
      <TextField
        label={<span>Country <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="country"
        value={formdataddressdetail2.country || ''}
        onChange={permanentAddressChange} 
        InputProps={{ style: { height: '45px' } }}
        error={Boolean(errors.country)}
        helperText={errors.country}
      />
      <TextField
        label={<span>Pincode <span style={{ color: 'red' }}>*</span></span>}
        variant="outlined"
        fullWidth
        name="pincode"
        value={formdataddressdetail2.pincode || ''}
        onChange={permanentAddressChange} 
        InputProps={{ style: { height: '45px' } }}
      />
      
    </Box>
  );
};
export const validateContactInfo = (formData) => {
  const errors = {};
  const requiredFields = [
    'address1',
    'address2',
    'area',
    'city',
    'state',
    'country',
    'pincode',
    'emergencyConName',
    'conNum',
    'relation'
  ];
  
  const contactDetails = formData?.employeeAddressDetails?.$values?.[0] || {};
  const emergencyContactDetails = formData?.employeeContactDetails?.$values?.[0] || {};

  requiredFields.forEach((field) => {
    const value = field in contactDetails ? contactDetails[field] : emergencyContactDetails[field];
    if (!value || value.toString().trim() === '') {
      errors[field] = 'This field is required';
    }
  });
  
  return errors;
};

export default AddressForm;