import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Shared/header';
import Footer from '../components/Shared/footer';
import image from '.././assets/images/image (1).png';
import MobileNumberField from '../components/Input/mobile';
import image1 from '.././assets/images/teamwork-concept-people-working.png';
import loginImage from '../assets/images/MOBILE_c.png';

const ViewOnlyPage = () => {
    const navigate = useNavigate();
    const [isMobileValid, setIsMobileValid] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');

    const handleStartFill = () => {
        if (isMobileValid) {
            try {
                if(!localStorage.getItem("currentStep")) {
                    localStorage.setItem("currentStep", JSON.stringify({
                    [mobileNumber]: 0
                    }));
                }
            } catch (error) {
                 localStorage.setItem("currentStep", JSON.stringify({
                    [mobileNumber]: 0
                }));
            }
            navigate('/Preonboarding', { state: { phoneno: mobileNumber } });
        }
    };

    // Add event listener for Enter key press
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && isMobileValid) {
                handleStartFill();
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isMobileValid, mobileNumber]); // Dependency array

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
        }}>
            <Header />
            <div style={{ width: '50%' }}>
                <Typography sx={{
                    marginTop: '80px', fontWeight: 'bold', color: '#212529', padding: '20px', fontSize: '24px'
                }}>
                    Get Started with Pre-Onboarding!
                </Typography>
                <Typography sx={{
                    marginTop: '10px', fontWeight: 'bold', marginLeft: '100px', background: '#ffc03d', width: '200px', color: '#212529', padding: '4px 40px', fontSize: '18px'
                }}>
                    Pre-Onboarding Form
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={image1} alt="logo" style={{ height: '300px', borderRadius: '20px', marginLeft: '300px' }} />
                </div>
            </div>
            <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ display: 'flex', marginBottom: '150px', boxShadow: '10px 10px 20px #babecc,-10px -10px -20px #ffffff' }}>
                    <div style={{ background: '#d8e8fe', padding: '10px', borderRadius: '10px', boxShadow: '10px 10px 20px #babecc,-10px -10px -20px #ffffff' }}>
                        <div style={{ background: '#fff', display: 'flex', justifyContent: 'center', padding: '100px 50px', borderRadius: '10px' }}>
                            <Typography sx={{
                                marginTop: '-70px', position: 'absolute', fontWeight: 'bold', color: '#212529', padding: '4px 40px', fontSize: '16px'
                            }}>
                                Mobile Number
                            </Typography>
                            <img src={loginImage} alt='logo' style={{ height: '50px', position: 'absolute' }} />
                            <MobileNumberField onValidationChange={setIsMobileValid} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} />
                            <Button
                                variant="contained"
                                sx={{
                                    position: 'absolute',
                                    margin: '150px 0px 50px 0',
                                    backgroundColor: isMobileValid ? '#829afe' : '#b0c4ff',
                                    '&:hover': {
                                        backgroundColor: isMobileValid ? '#829af0' : '#b0c4ff',
                                    },
                                }}
                                onClick={handleStartFill}
                                disabled={!isMobileValid}
                            >
                                Continue as Guest
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ marginBottom: '0' }} />
        </div>
    );
};

export default ViewOnlyPage;