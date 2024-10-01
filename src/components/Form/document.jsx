import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Documentform = ({ formData, setFormData }) => {
  const [subDocumentType, setSubDocumentType] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);

  useEffect(() => {
    const storedFileNames = JSON.parse(localStorage.getItem('uploadedFileNames')) || [];
    setFileNames(storedFileNames);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const newFileNames = acceptedFiles.map((file) => file.name);

    const updatedFileNames = [...fileNames, ...newFileNames];
    setFileNames(updatedFileNames);
    localStorage.setItem('uploadedFileNames', JSON.stringify(updatedFileNames));

    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...(prev.uploadedFiles || []), ...acceptedFiles],
    }));

    setSelectedFileNames([...selectedFileNames, ...newFileNames]);
  }, [fileNames, selectedFileNames, setFormData]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf, .doc, .docx, .jpg, .png',
    multiple: true,
  });

  const handleDocumentTypeChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      documentType: event.target.value,
    }));
    setSubDocumentType('');
    setSelectedFileNames([]);
  };

  const handleSubDocumentTypeChange = (event) => {
    const value = event.target.value;
    setSubDocumentType(value);
    setFormData((prev) => ({
      ...prev,
      subDocumentType: value,
    }));
  };

  const handleRemoveFile = (fileName) => {
    if (fileNames && Array.isArray(fileNames)) {
      const updatedFileNames = fileNames.filter((name) => name !== fileName);
      setFileNames(updatedFileNames);
      localStorage.setItem('uploadedFileNames', JSON.stringify(updatedFileNames));
    }

    if (selectedFileNames && Array.isArray(selectedFileNames)) {
      const updatedSelectedFileNames = selectedFileNames.filter((name) => name !== fileName);
      setSelectedFileNames(updatedSelectedFileNames);
    }

    setFormData((prev) => {
      if (prev.uploadedFiles && Array.isArray(prev.uploadedFiles)) {
        return {
          ...prev,
          uploadedFiles: prev.uploadedFiles.filter((file) => file.name !== fileName),
        };
      }
      return prev;
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
      {/* Document Type Dropdown */}
      <FormControl sx={{ gridColumn: 'span 2' }}>
        <InputLabel id="document-type-label">Document Type</InputLabel>
        <Select
          labelId="document-type-label"
          value={formData.documentType || ''}
          onChange={handleDocumentTypeChange}
          label="Document Type"
        >
          <MenuItem value="education">Education Document</MenuItem>
          <MenuItem value="experience">Experience Document</MenuItem>
          <MenuItem value="national">National Document</MenuItem>
          <MenuItem value="Personal">Personal Information Document</MenuItem>
        </Select>
      </FormControl>

      {/* Sub-Document Dropdown */}
      {formData.documentType === 'education' && (
        <FormControl sx={{ gridColumn: 'span 2' }}>
          <InputLabel id="sub-document-type-label">Select Educational Document</InputLabel>
          <Select
            labelId="sub-document-type-label"
            value={subDocumentType}
            onChange={handleSubDocumentTypeChange}
            label="Select Educational Document"
          >
            <MenuItem value="12th marksheet">12th Mark Sheet</MenuItem>
            <MenuItem value="11th marksheet">11th Mark Sheet</MenuItem>
            <MenuItem value="10th marksheet">10th Mark Sheet</MenuItem>
            <MenuItem value="degree_certificate">Degree Certificate</MenuItem>
          </Select>
        </FormControl>
      )}

      {formData.documentType === 'national' && (
        <FormControl sx={{ gridColumn: 'span 2' }}>
          <InputLabel id="national-document-type-label">Select National Document</InputLabel>
          <Select
            labelId="national-document-type-label"
            value={subDocumentType}
            onChange={handleSubDocumentTypeChange}
            label="Select National Document"
          >
            <MenuItem value="passport">Passport</MenuItem>
            <MenuItem value="aadhaar">Aadhaar</MenuItem>
            <MenuItem value="pan">PAN</MenuItem>
          </Select>
        </FormControl>
      )}

      <Box
        {...getRootProps()}
        sx={{
          gridColumn: 'span 2',
          padding: '20px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
          background: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            borderColor: '#1976d2',
            backgroundColor: '#f0f8ff',
          },
        }}
      >
        <input {...getInputProps()} />

        {/* Icon for visual enhancement */}
        <CloudUploadIcon sx={{ fontSize: '48px', color: '#1976d2', mb: 1 }} />

        {/* Text content */}
        <Typography variant="body1" sx={{ color: '#555', fontSize: '16px', fontWeight: 500 }}>
          Drag and drop {subDocumentType ? subDocumentType.replace(/_/g, ' ') : 'files'} here, or click to browse
        </Typography>

        {/* Optional: Subtext or additional instructions */}
        <Typography variant="body2" sx={{ color: '#888', mt: 1 }}>
          Supported file formats: PDF, DOCX, PNG, JPG
        </Typography>
      </Box>

      {/* Display Uploaded File Names */}
      {fileNames.length > 0 && (
        <Box
          sx={{
            gridColumn: 'span 2',
            padding: '10px',
            background: '#f5f5f5',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <Typography variant="h6">Uploaded Files:</Typography>
          {fileNames.map((fileName) => (
            <Box
              key={fileName}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px',
                background: '#fff',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            >
              <Typography variant="body1">{subDocumentType}</Typography>
              <Typography variant="body1">{fileName}</Typography>
              <Button variant="outlined" color="error" onClick={() => handleRemoveFile(fileName)}>
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {/* Display Selected File Names in Label */}
      {selectedFileNames.length > 0 && (
        <Typography variant="body2" sx={{ gridColumn: 'span 2', marginTop: '10px' }}>
          Selected Files: {selectedFileNames.join(', ')}
        </Typography>
      )}
    </Box>
  );
};

export default Documentform;
