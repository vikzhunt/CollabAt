// src/components/Profile/ProfileForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Clear as ClearIcon } from '@mui/icons-material';
import { updateUser } from '../../APIs/User';

const ProfileForm = () => {
  const [res,setRes]=useState(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    degree: '',
    interest: '',
    techSkills: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      setRes(e.target.files[0]);  
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profile).forEach(key => {
      if (profile[key]) {
        formData.append(key, profile[key]);
      }
    });
    
    if (res) {
      formData.append('resume', res);
    }
    console.log(formData);
    try{
      await updateUser(formData);
      console.log("done")
      navigate("/login");
    }
    catch(error){
      console.log('login failed',error);
      alert("Login Failed");
    }
  };

  const clearResume = () => {
    setRes(null)
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
          accept=".pdf" 
          onChange={handleChange}
        />
        </Button>
        {res && (
          <IconButton onClick={clearResume} color="secondary" aria-label="clear resume">
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      {res && (
        <Typography variant="body2" color="textSecondary" mt={1}>
          Selected File: {res.name}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Save Profile
      </Button>
    </Box>
  );
};

export default ProfileForm;
