import React, { useState } from 'react';
import { TextField, Button, Link, Container, Box, Typography, IconButton , InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material'; // Social media icons
import logo from '../assets/images/workiy-logo-blacklogo.png'; // Import logo
import BG from '../assets/images/loginbackgroud.png'; // Background image
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
 
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setSnackbarOpen(false);
};



const handleLogin = (e) => {
  e.preventDefault();
  
  // Mock user data
  const userData = {
      'user@workiy.ca': { email: 'user@workiy.ca', role: 'user', password: 'userpass' },
      'hr@workiy.ca': { email: 'hr@workiy.ca', role: 'hr', password: 'hrpass' },
  };

  const user = userData[email];
  console.log('Logging in with:', { email, password });

  if (user && user.password === password) {
      onLogin({ email: user.email, role: user.role });
      navigate('/dashboard');
  } else {
      console.log('Invalid email or password');
      setSnackbarMessage('Invalid email or password');
      setSnackbarOpen(true); // Open the Snackbar
  }
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <img alt="Login Image" src={logo} style={{ height: 40, color: '#27272A', marginBottom: 16 }} />
          <div>
            <Typography component="h1" variant="h4" style={{ fontFamily: 'sans-serif', color: '#27272A', fontWeight: '700', fontSize: '24px' }} gutterBottom>
              Login
            </Typography>
            <Typography>
              Welcome Back! Login To Your Account Below
            </Typography>
          </div>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <Box sx={{ width: '100%', mb: 1 }}>
              <Typography variant="body1" style={{ fontFamily: 'sans-serif', color: '#27272a', fontWeight: '700', fontSize: '14px' }} sx={{ mb: 0.5 }}>
                Email ID
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box sx={{ width: '100%', mb: 1 }}>
      <Typography
        variant="body1"
        style={{ fontFamily: 'sans-serif', color: '#27272a', fontWeight: '700', fontSize: '14px' }}
        sx={{ mb: 0.5 }}
      >
        Password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <Button
      type="submit"
      variant="contained"
      style={{ background: '#FFDE7E' }}
      sx={{ mt: 3, mb: 2, width: '100px', alignSelf: 'center' }}
    >
      Login
    </Button>
  </Box>
          </form>
          <Link href="/forgot-password" sx={{ color: '#000', textDecoration: 'none' }} variant="body2">
            Forgot Password?
          </Link>
        </Box>
      </Container>
      <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
    message={snackbarMessage}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
    sx={{ 
      zIndex: (theme) => theme.zIndex.snackbar + 1,
      marginTop: '30px',
      '& .MuiSnackbarContent-root': {
        backgroundColor: '#212529',
        color:'#fff',
        
      },
    }}
    action={
        <Button color="inherit" onClick={handleSnackbarClose}>
           <CloseIcon />
        </Button>
    }
/>
      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          height: '10vh',
          background:'#F7F8FA',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' ,color:'#C9D0DD',background:'#F7F8FA'}}>
          <Typography variant="body2" >
            © 2024 Workiy
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" sx={{ color: 'inherit', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: 'inherit', textDecoration: 'none' }}>
              Community Guidelines
            </Link>
            <Link href="#" sx={{ color: 'inherit', textDecoration: 'none' }}>
              Cookie Policy
            </Link>
            <Link href="#" sx={{ color: 'inherit', textDecoration: 'none' }}>
              Copyright Policy
            </Link>
            <Link href="#" sx={{ color: 'inherit', textDecoration: 'none' }}>
              Send Feedback
            </Link>
            <Link href="#" sx={{ color: 'inherit', textDecoration: 'none' }}>
              Language
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton aria-label="facebook" href="#" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton aria-label="twitter" href="#" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton aria-label="linkedin" href="#" color="inherit">
              <LinkedIn />
            </IconButton>
            <IconButton aria-label="instagram" href="#" color="inherit">
              <Instagram />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
