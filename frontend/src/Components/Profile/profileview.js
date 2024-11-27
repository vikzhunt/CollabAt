// src/components/Profile/ProfileView.js
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import { getAllUsers } from '../../APIs/User';

const ProfileView = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getAllUsers();
      const curr = localStorage.getItem('email');
      const curruser=res.data.userList.filter((user) => user.email===curr)
      console.log(curruser)
      setProfile(curruser[0]);
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: 800,
        mx: 'auto',
        mt: 4,
        p: 4,
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        background: 'linear-gradient(135deg, #f3f4f6, #ffffff)',
      }}
    >
      {/* Profile Information */}
      <Box sx={{ flex: 1, pr: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#334c94' }}>
          Profile Information
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 1.5 }}>
          <strong>Name:</strong> {profile.name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 1.5 }}>
          <strong>Email:</strong> {profile.email}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 1.5 }}>
          <strong>Degree:</strong> {profile.degree}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 1.5 }}>
          <strong>Interests:</strong> {profile.interest}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 1.5 }}>
          <strong>Technical Skills:</strong> {profile.techSkills}
        </Typography>
        {/* remove null after backend connected  */}
        <Box mt={2}>
          <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}>
            Resume:
          </Typography>
          {profile.resume ? (
            <Button
              variant="contained"
              href={profile.resume} // Replace with actual URL if necessary
              target="_blank"
              sx={{
                mt: 1,
                backgroundColor: '#1a73e8',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1765c7',
                },
              }}
            >
              View Resume
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled
              sx={{
                mt: 1,
                backgroundColor: '#f5f5f5',
                color: '#a0a0a0',
              }}
            >
              Not Available
            </Button>
          )}
        </Box>
      </Box>
      
      {/* Profile Picture */}
      <Box
        sx={{
          flexShrink: 0,
          width: 200,
          height: 200,
          borderRadius: '50%',
          overflow: 'hidden',
          ml: 4,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '4px solid #e0e0e0',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUyfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MHx8MHx8fDA%3D"
          alt="Profile"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};

export default ProfileView;
