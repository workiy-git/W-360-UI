import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider, Button } from '@mui/material';


import MobileNumberField from '../components/Input/mobile';
import image1 from '.././assets/images/teamwork-concept-people-working.png';
import loginImage from '../assets/images/MOBILE_c.png';
import PerOnboarding from '../components/Menu/on-boarding';  // Import the PerOnboarding component

const ViewOnlyPage = () => {
    const [isMobileValid, setIsMobileValid] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [showPerOnboarding, setShowPerOnboarding] = useState(false); // State to control component rendering

    const handleStartFill = () => {
        if (isMobileValid) {
            // Directly show the PerOnboarding component instead of navigating
            setShowPerOnboarding(true);
        }
    };

    // Add event listener for Enter key press
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && isMobileValid) {
                handleStartFill();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isMobileValid, mobileNumber]);

    return (
        <Container>
          
            {!showPerOnboarding ? (
                <div style={{ width: '50%' }}>
                   
                   
                    <div
                        style={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                marginBottom: '150px',
                                boxShadow: '10px 10px 20px #babecc,-10px -10px -20px #ffffff',
                            }}
                        >
                            <div
                                style={{
                                    background: '#d8e8fe',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    boxShadow: '10px 10px 20px #babecc,-10px -10px -20px #ffffff',
                                }}
                            >
                                <div
                                    style={{
                                        background: '#fff',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '100px 50px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            marginTop: '-70px',
                                            position: 'absolute',
                                            fontWeight: 'bold',
                                            color: '#212529',
                                            padding: '4px 40px',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Mobile Number
                                    </Typography>
                                    <img
                                        src={loginImage}
                                        alt="logo"
                                        style={{ height: '50px', position: 'absolute' }}
                                    />
                                    <MobileNumberField
                                        onValidationChange={setIsMobileValid}
                                        mobileNumber={mobileNumber}
                                        setMobileNumber={setMobileNumber}
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{
                                            position: 'absolute',
                                            margin: '150px 0px 50px 0',
                                            backgroundColor: isMobileValid ? '#829afe' : '#b0c4ff',
                                            '&:hover': {
                                                backgroundColor: isMobileValid
                                                    ? '#829af0'
                                                    : '#b0c4ff',
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
                </div>
            ) : (
                // Render PerOnboarding component if mobile number is valid
                <PerOnboarding phoneno={mobileNumber} />
            )}
          
        </Container>
    );
};

export default ViewOnlyPage;
