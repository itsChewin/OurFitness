import React from 'react';
import { Box, Typography } from '@mui/material';

const CustomButton = ({ text = '', handle = () => {}, fontSize = 16 }) => {
  return (
    <Box
      onClick={handle}
      sx={{
        backgroundColor: '#002B5B',
        padding: '6px 18px',
        borderRadius: 12,
        border: 'white 2px solid',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#EA5455',
          transform: 'scale(1.05)',
          transition: 'all 0.1s ease-in-out',
         
        },
      }}
    >
      <Typography fontSize={fontSize}>{text}</Typography>
    </Box>
  );
};

export default CustomButton;
