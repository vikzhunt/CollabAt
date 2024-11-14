// src/Components/Auth/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup Attempt:', { name, email, password, confirmPassword });

    // Implement SignUp
    // If successful redirect to ProfileForm after signup
    navigate('/profile'); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #2196f3 0%, #1976d2 100%)', 
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', padding: 3, borderRadius: '12px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" mb={2} sx={{ fontWeight: 'bold', color: '#333' }}>
            Create an Account
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#2196f3' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2196f3' },
                  '&:hover fieldset': { borderColor: '#1976d2' },
                },
              }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#2196f3' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2196f3' },
                  '&:hover fieldset': { borderColor: '#1976d2' },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#2196f3' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2196f3' },
                  '&:hover fieldset': { borderColor: '#1976d2' },
                },
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#2196f3' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2196f3' },
                  '&:hover fieldset': { borderColor: '#1976d2' },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#2196f3',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Login
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Signup;
