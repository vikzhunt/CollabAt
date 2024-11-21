// src/components/Profile/ProfileForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Clear as ClearIcon } from '@mui/icons-material';
import { updateUser } from '../../APIs/User';

const ProfileForm = () => {
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    degree: '',
    interest: '',
    techSkills: '',
    resume: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfile({
      ...profile,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await updateUser({ profile });
      console.log("done")
      navigate("/dashboard");
    }
    catch(error){
      console.log('login failed',error);
      alert("Login Failed");
    }
  };

  const clearResume = () => {
    setProfile({
      ...profile,
      resume: null,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" mb={2}>Create Profile</Typography>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={profile.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        value={profile.email}
        onChange={handleChange}
      />
      <TextField
        label="Degree"
        name="degree"
        fullWidth
        margin="normal"
        value={profile.degree}
        onChange={handleChange}
      />
      <TextField
        label="Area of Interest"
        name="interest"
        fullWidth
        margin="normal"
        value={profile.interest}
        onChange={handleChange}
      />
      <TextField
        label="Technical Skills"
        name="techSkills"
        fullWidth
        margin="normal"
        value={profile.techSkills}
        onChange={handleChange}
      />

      <Box display="flex" alignItems="center" mt={2}>
        <Button
          variant="contained"
          component="label"
          fullWidth
        >
          Upload Resume
          <input
            type="file"
            name="resume"
            hidden
            onChange={handleChange}
          />
        </Button>
        {profile.resume && (
          <IconButton onClick={clearResume} color="secondary" aria-label="clear resume">
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      {profile.resume && (
        <Typography variant="body2" color="textSecondary" mt={1}>
          Selected File: {profile.resume.name}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Save Profile
      </Button>
    </Box>
  );
};

export default ProfileForm;
