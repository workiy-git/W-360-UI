import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import PersonalInfoForm from '../Form/personal-information';
import ContactInfoForm from "../Form/contact-details";
import AccountDetailsForm from '../Form/education-details';
import Experience from '../Form/experience-details';
import AdditionalInfoForm from '../Form/review-download';
import NationalId from '../Form/national-ids';
import Document from '../Form/document';

import Person from '../../assets/images/Person-logo.png';
import PersonSelected from '../../assets/images/account_circle_yellow.png';
import Education from '../../assets/images/school.png';
import EducationSelected from '../../assets/images/school_YELLOW.png';
import Contact from '../../assets/images/content_logo.png';
import ContactSelected from '../../assets/images/content_paste_yellow.png'; // New selected image
import Flag from '../../assets/images/flag.png';
import FlagSelected from '../../assets/images/flag_yellow.png'; // New selected image
import Download from '../../assets/images/check_circle.png';
import DownloadSelected from '../../assets/images/account_circle_yellow.png'; // New selected image
import Company from '../../assets/images/apartment.png';
import CompanySelected from '../../assets/images/apartment_yellow.png'; // New selected image
import axios from 'axios';
import config from '../../config/config.production';
import Back from '../../assets/images/move_item.png';
import  Documents from '../../assets/images/document.png';
import DocumentsSelected from '../../assets/images/document_yellow.png';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { validate } from '../Form/personal-information';
import { validateContactInfo } from '../Form/contact-details';
import { validateEducationInfo } from '../Form/education-details';
import { validateExperienceDetails } from '../Form/experience-details';
import Loader from '../../pages/launchscreen'
const stepImages = [
  { default: Person, selected: PersonSelected },
  { default: Contact, selected: ContactSelected },
  { default: Education, selected: EducationSelected },
  { default: Company, selected: CompanySelected },
  { default: Flag, selected: FlagSelected },
  { default: Download, selected: DownloadSelected },
  { default: Documents, selected: DocumentsSelected }
];

const PerOnboarding = () => {
  const { state } = useLocation();
  const { phoneno } = state;
  const getCurrentPageFromLocalStorage = () => {

     if(!localStorage.getItem("currentStep")) {
        localStorage.setItem("currentStep", JSON.stringify({
          [phoneno]: 0
        }));

        return 0;
      }

      try {

        const data = JSON.parse(localStorage.getItem("currentStep"));

        return data[phoneno] ? Number(data[phoneno]) : 0;
        
      } catch (error) {
        localStorage.setItem("currentStep", JSON.stringify({
          [phoneno]: 0
        }));

        return 0;
      }
  }
  const [currentStep, setCurrentStep] = useState(getCurrentPageFromLocalStorage());
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 

  console.log("phonenumber", phoneno, state, formData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const fetchEmployeeData = async () => {
    try {
      setFormData((prevData) => ({
        ...prevData,
        mobileNo: phoneno,
      }));

      const response = await axios.get(`${config.apiUrl}EmployeeInfo/getemployeeinfo/phonenumber?phoneNumber=${phoneno}`);
      console.log('Employee Data received:', response.data.employee
      );

      if (response.data.employee&& Object.keys(response.data.employee).length > 0) {
        const formattedData = {
          ...response.data.employee,
          hireDate: formatDate(response.data.employee.hireDate),
          birthDate: formatDate(response.data.employee.birthDate),
        };
        setFormData(formattedData);
      } else {
        // Initialize formData with empty values if no data is found
        setFormData({
          firstName: '',
          lastName: '',
          fatherName: '',
          bloodGroup: '',
          maritalStatus: '',
          gender: '',
          dob: '',
          personalEmail: '',
          mobileNo: phoneno,
          address: '',
          username: '',
          password: '',
          confirmPassword: '',
          preferredLanguage: '',
          communicationPrefs: [],
          profilePicture: null,
          bio: '',
          socialLinks: { twitter: '', linkedin: '' },
        });
      }
    } catch (error) {
      console.error('Error fetching Employee data:', error);
    }
  };

 
  useEffect(() => {

  
    fetchEmployeeData();

  }, [phoneno]);

 
  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem("currentStep"));

    try {
      prevData[phoneno] = currentStep;
      localStorage.setItem("currentStep", JSON.stringify(prevData));
    } catch (error) {
        localStorage.setItem("currentStep", JSON.stringify({
          [phoneno]: 0
        }));
    }
  }, [currentStep])

  if (loading) return <Loader/>;
  if (error) return <p>Error: {error}</p>;
  // if (!employeeData) return <p>No data found</p>;

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const steps = [
    { title: 'Personal Information', component: PersonalInfoForm, image: stepImages[0] },
    { title: 'Contact Details', component: ContactInfoForm, image: stepImages[1] },
    { title: 'Education Details', component: AccountDetailsForm, image: stepImages[2] },
    { title: 'Experience', component: Experience, image: stepImages[3] },
    { title: 'National ID', component: NationalId, image: stepImages[4] },
    { title: 'Document', component: Document, image: stepImages[6] },
    { title: 'Submit', component: AdditionalInfoForm, image: stepImages[5] },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

 
  console.log("form datas",formData)
  
  const handleNextStep = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const errors = {};
    const CurrentStepComponent = steps[currentStep]?.component;

    console.log(`Handling step ${currentStep}`);
    console.log('Current Form Data:', formData);

    // Validation Logic
    if (currentStep === 0) { // Personal Information
      const personalInfoErrors = validate(formData);
      console.log('Personal Info Errors:', personalInfoErrors);
      Object.assign(errors, personalInfoErrors);
    } else if (currentStep === 1) { // Contact Details
      const contactInfoErrors = validateContactInfo(formData);
      console.log('Contact Info Errors:', contactInfoErrors);
      Object.assign(errors, contactInfoErrors);
    } else if (currentStep === 2) { // Education Details
      const educationDetailsErrors = validateEducationInfo(formData);
      console.log('Education Details Errors:', educationDetailsErrors);
      Object.assign(errors, educationDetailsErrors);
    } else if (currentStep === 3) { // Work Experience Details
      const experienceDetailsErrors = validateExperienceDetails(formData || []);
      console.log('Experience Details Errors:', experienceDetailsErrors);

      if (Object.keys(experienceDetailsErrors).length > 0) {
        errors.employeeExperienceDetails = experienceDetailsErrors;
      }
    } else if (typeof CurrentStepComponent?.validate === 'function') {
      const validationErrors = CurrentStepComponent.validate(formData);
      console.log('Current Step Validation Errors:', validationErrors);
      Object.assign(errors, validationErrors);
    }

    console.log('Collected Errors:', errors);

    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSnackbarMessage('Please correct the errors before proceeding.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return; // Exit if validation fails
    }

    setLoading(true);
    console.log(formData);
    
    try {
        let flag;
        let formHasId = '$id' in formData ? true : false;

        if (formData && formHasId) {
            flag = 2; // Update
        } else if (!data && formData && !formHasId) {
            flag = 1; // Add
        } else {
            flag = 3; // No change
        }

        if (flag === 3) {
            setSnackbarMessage('No changes to save');
            setSnackbarSeverity('info');
            setOpenSnackbar(true);
        } 
        else if(flag === 2) {
          const url = `${config.apiUrl}employeeinfo/addemployeeinfo?flag=${flag}`;
          await axios.post(url, formData);
          setFormData({})
          fetchEmployeeData()
          !formHasId && fetchEmployeeData();

          setSnackbarMessage(flag === 1 ? 'Employee data added successfully' : 'Employee data updated successfully');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        }
        else {
            const url = `${config.apiUrl}employeeinfo/addemployeeinfo?flag=${flag}`;
            await axios.post(url, formData);

            !formHasId && fetchEmployeeData();

            setSnackbarMessage(flag === 1 ? 'Employee data added successfully' : 'Employee data updated successfully');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        }

        if (currentStep === steps.length - 1) {
            console.log('Submitting form data...', formData);
            await postFormData(formData);
            setSnackbarMessage('Form submitted successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } else {
            console.log('Moving to next step...');
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    } catch (error) {
        console.error('Error saving Employee data:', error);
        setSnackbarMessage('Error saving Employee data');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
    } finally {
        setLoading(false);
    }
};
  

  const validateCurrentStep = () => {
    const errors = {};
    const CurrentStepComponent = steps[currentStep].component;

    if (typeof CurrentStepComponent.validate === 'function') {
      const validationErrors = CurrentStepComponent.validate(formData);

      for (const key in validationErrors) {
        if (validationErrors[key]) {
          errors[key] = validationErrors[key];
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }

    return true;
  };
const postFormData = async (formData) => {
  console.log("datas", formData)
  try{
  axios.post(`${config.apiUrl}employeeinfo/addemployeeinfo`, formData)
    console.log('saved')
  }
  catch(error){
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }
};

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      // Post form data before moving to the next step
        
      await postFormData(formData);
  
      // Move to the next step
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setErrorMessage(''); // Clear any previous error message
    } else {
      setErrorMessage('Please fill in all required fields.');
    }
  };

  const handleLogoClick = (index) => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const handleDiscard = () => {
    // Add your discard logic here
    handleClose();
    navigate('/'); // Navigate to home or another page
  };


  return (
    <div  className="scrollable" style={{ background: '#fff'}}>
         <div style={{ display: 'flex', justifyContent:'space-between'}}>
      <Button
  variant="contained"
  sx={{
    padding: '5px 10px',
    marginTop: '20px',
    marginLeft: '40px',
    backgroundColor: currentStep === 0 ? '#ccc' : '#829afe',
    '&:hover': {
      backgroundColor: currentStep === 0 ? '#ccc' : '#829af0',
    },
  }}
  onClick={() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Update the step
  }}
  disabled={currentStep === 0} // Disable the button on the first step
  startIcon={<ArrowBackIcon />} // Add the back icon to the button
>
  Previous
</Button>
        <Button
          style={{ background: '#212529', color: '#fff', padding: '5px 10px',  marginTop: '20px', marginRight: '40px',}}
          onClick={handleClickOpen} // Open the dialog
        >
          <img
            src={Back}
            alt="Back"
            style={{ height: '20px', padding: '5px 15px 5px 5px' }}
          />
          Exit
        </Button>
        
      </div>
      <div style={{ display: 'flex', margin: '5px 190px' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '600px', justifyContent: 'space-between' }}>
          {steps.map((step, index) => (
           <div
           key={index}
           style={{
             width: '100%',
             textAlign: 'center',
             position: 'relative',
             cursor: index < currentStep ? 'pointer' : 'default',
           }}
           onClick={() => handleLogoClick(index)}
         >
           <img
             src={index === currentStep ? step.image.selected : step.image.default}
             alt={step.title}
             style={{
               width: '20px',
               height: '20px',
               marginTop: '10px',
             }}
           />
           <span
             style={{
               display: 'block',
               fontWeight:'bold',
               fontSize: '12px',
               marginBottom: '10px',
               color: index <= currentStep ? '#ffc03d' : '#808080',
             }}
           >
             {step.title}
           </span>
           <div
             style={{
               width: '14px',
               height: '14px',
               borderRadius: '50%',
               padding:'2px',
               background: index <= currentStep ? '#ffc03d' : '#808080',
               color: '#fff',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               margin: '-6px 0px -16px 157px',
               position: 'absolute',
               fontSize: '10px',
               zIndex: '2'
             }}
           >
             {index + 1}
           </div>
           <div
             style={{
               height: '5px',
               background: index <= currentStep ? '#ffc03d' : '#808080',
               transition: 'background 0.7s',
               borderRadius: '2px',
               width: '170px'
             }}
           />
         </div>
          ))}
        </div>
      </div>
      <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
  sx={{ 
    zIndex: (theme) => theme.zIndex.snackbar + 1,
    marginTop: '80px',
    '& .MuiSnackbarContent-root': {
      backgroundColor: '#000',
      color:'#fff',
      
    },
  }} // Increase zIndex if necessary
>
  <Alert 
    onClose={handleCloseSnackbar} 
    severity={snackbarSeverity} 
    sx={{ 
      width: '100%',
      backgroundColor: '#192531',
      color:'#6F7C89',
    
  borderRadius:'50px'
    }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>


      <Container style={{ background: '#e1e4f1', marginTop: '30px', marginBottom: '100px', padding: '20px 20px 20px 20px', maxWidth: '1345px', borderRadius: '10px' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {errorMessage && (
              <Typography variant="h6" color="error" align="center" style={{ marginBottom: '20px' }}>
                {errorMessage}
              </Typography>
            )}
            <CurrentStepComponent
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              setStep={setCurrentStep}
              handleSubmit={handleSubmit}
              errors={errors}
            />
            {/* <DownloadWordButton demoData={formData} /> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              {currentStep < steps.length - 1 && (
                // Render "Previous" button on all steps except the first and the last
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: currentStep === 0 ? '#ccc' : '#829afe',
                    '&:hover': {
                      backgroundColor: currentStep === 0 ? '#ccc' : '#829af0',
                    },
                  }}
                  onClick={() => {
                    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Update the step
                  }}
                  disabled={currentStep === 0} // Disable the button on the first step
                >
                  Previous
                </Button>

              )}

              {currentStep < steps.length - 2 ? (
                // Render "Save and Continue" button for all steps except the last two
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#829afe',
                    '&:hover': {
                      backgroundColor: '#829af0',
                    },
                  }}
                  onClick={handleNextStep}
                >
                  Save and Continue
                </Button>
              ) : currentStep === steps.length - 2 ? (
                // Render "Submit" button on the second-to-last step
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#829afe',
                    '&:hover': {
                      backgroundColor: '#829af0',
                    },
                  }}
                  onClick={handleNextStep}
                >
                  Submit
                </Button>
              ) : null}
            </div>
          </>
        )}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Unsaved Changes"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have unsaved changes. Are you sure you want to leave without saving?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNextStep} color="primary">
            Save
          </Button>
          <Button onClick={handleDiscard} color="primary" autoFocus>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
  );
};

export default PerOnboarding;