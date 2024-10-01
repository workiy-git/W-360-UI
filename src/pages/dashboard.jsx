import React from 'react';  
import { Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Shared/dashboard-header';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/'); 
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
        }}>
            <Header />
            <div style={{
                height: '70vh',
                padding: '20px 50px',
            }}>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                    {/* First Row of Widgets */}
                    <Grid item xs={12} md={4} onClick={handleButtonClick} style={{ cursor: 'pointer' }}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>W-360</Typography>
                            <Typography>
                                Submit and verify all employee onboarding documents promptly, ensuring access to essential resources and policies for a smooth integration.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>LMS</Typography>
                            <Typography>
                                A Leave Management System (LMS) is a digital platform designed to streamline the process of managing employee leave requests, approvals, and tracking in an organization.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Attendance Management System</Typography>
                            <Typography>
                                An Attendance Management System is a software solution used to track, record, and manage employee attendance, ensuring accurate timekeeping data for an organization.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Second Row of Widgets */}
                    <Grid container item xs={12} spacing={3} style={{ marginTop: '30px' }}> {/* Increased margin */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Asset Management System</Typography>
                                <Typography>
                                    An Asset Management System helps organizations track and manage physical assets throughout their lifecycle, optimizing usage, and minimizing losses through proper maintenance and monitoring.
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Performance Management System</Typography>
                                <Typography>
                                    A Performance Management System is designed to evaluate and manage employee performance, providing tools for goal setting, progress tracking, and performance reviews, ultimately improving organizational productivity.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Dashboard;
