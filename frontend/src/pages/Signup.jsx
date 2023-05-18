import React, { useState } from 'react';
import { Box, Card, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:3001';


const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from automatically submitting

    try {
      const response = await axios.post('/api/signup', formData);
      console.log(response.data);
      navigate("/signin");
      
    } catch (error) {
      console.error('Error during form submission:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        $: {
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
        },
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 500,
          p: 4,
          gap: 4,
          backgroundColor: '#white',
        }}
      >
        <Typography fontSize="2.5rem" fontWeight="700" my="50px">
          Sign up
        </Typography>
        <TextField
          fullWidth
          label={'Username'}
          placeholder="Type your username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <TextField
          fullWidth
          label={'Password'}
          placeholder="Type your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Link color="#999999" href="/signin" sx={{ alignSelf: 'end' }}>
          Sign in?
        </Link>
        <button
          style={{
            width: '100%',
            padding: '.25rem',
            fontSize: '1.5rem',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #EA5455 50%, #002B5B 50%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '100% 0%',
            transition: 'all .2s ease-in-out',
            color: 'white',
          }}
          onClick={handleFormSubmit}
          onMouseOver={(e) => {
            e.target.style.color = 'white';
            e.target.style.backgroundPosition = '0% 0%';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = 'white';
            e.target.style.backgroundPosition = '100% 0%';
          }}
        >
          Create Account
        </button>
      </Card>
    </Box>
  );
};

export default Signup;
