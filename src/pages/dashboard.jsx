import React from 'react';  
import { Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Shared/dashboard-header';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/'); 
    };
 
    const userRole = user.role;
    // Array of widget data
    const widgets = [
        {
            title: 'W-360',
            description: 'Submit and verify all employee onboarding documents promptly, ensuring access to essential resources and policies for a smooth integration.',
            onClick: handleButtonClick,
            roles: ['admin', 'hr', 'user'] 
        },
        {
            title: 'LMS',
            description: 'A Leave Management System (LMS) is a digital platform designed to streamline the process of managing employee leave requests, approvals, and tracking in an organization.',
            onClick: null,
            roles: ['hr', 'user'] 
        },
        {
            title: 'Attendance Management System',
            description: 'An Attendance Management System is a software solution used to track, record, and manage employee attendance, ensuring accurate timekeeping data for an organization.',
            onClick: null,
            roles: ['hr'] 
        },
        {
            title: 'Asset Management System',
            description: 'An Asset Management System helps organizations track and manage physical assets throughout their lifecycle, optimizing usage, and minimizing losses through proper maintenance and monitoring.',
            onClick: null,
            roles: ['hr']
        },
        {
            title: 'Performance Management System',
            description: 'A Performance Management System is designed to evaluate and manage employee performance, providing tools for goal setting, progress tracking, and performance reviews, ultimately improving organizational productivity.',
            onClick: null,
            roles: ['hr']
        }
    ];

    // Filter widgets based on user role
    const filteredItems = widgets.filter(item => item.roles.includes(userRole));

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
                    {filteredItems.map((widget, index) => (
                        <Grid item xs={12} md={4} key={index} onClick={widget.onClick} style={{ cursor: widget.onClick ? 'pointer' : 'default', marginBottom:'30px' }}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{widget.title}</Typography>
                                <Typography>
                                    {widget.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Dashboard;
