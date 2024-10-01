import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone';
import FormHelperText from '@mui/material/FormHelperText';

function MobileNumberField({ onValidationChange, mobileNumber, setMobileNumber }) {

    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;

        // Allow only numbers
        if (/^\d*$/.test(value)) {
            setMobileNumber(value);

            // Validation: exactly 10 digits
            if (value.length !== 10) {
                setError(true);
                setHelperText('Mobile number must be exactly 10 digits.');
                onValidationChange(false);  // Pass false if invalid
            } else {
                setError(false);
                setHelperText('');
                onValidationChange(true);  // Pass true if valid
            }
        }
    };

    useEffect(() => {
        // Initial call to set validation status
        setMobileNumber(mobileNumber);
        onValidationChange(mobileNumber.length === 10);
        console.log("mobilenumber", mobileNumber);
       
    }, [mobileNumber, onValidationChange]);

    return (
        <>
            <TextField
    variant="outlined"
    value={mobileNumber}
    onChange={handleChange}
    error={error}
    placeholder="Enter your mobile number"
    sx={{
        marginTop: '70px',
        background: '#fff',
        borderRadius: '10px',
        border: 'none',
        '& .MuiOutlinedInput-root': {
            border: 'none',
            '& fieldset': {
                border: 'none',
            },
            '&:hover fieldset': {
                borderBottom: '3px solid',
                borderColor: '#829af0',
            },
            '&.Mui-focused fieldset': {
                borderBottom: '3px solid',
                borderColor: '#829af0',
            },
        },
    }}
    InputProps={{
        style: { height: '45px' },
        inputProps: { 
            maxLength: 10,
            style: { textAlign: 'center' }, // Center the text
        },
    }}
/>
{helperText && (
    <FormHelperText error={error} style={{ position: 'absolute', marginTop: '120px' }}>
        {helperText}
    </FormHelperText>
)}

        </>
    );
}

export default MobileNumberField;