import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box mt={5}
    sx={{
      // backgroundColor: 'white', // Ubah warna background sesuai keinginan
    }}>
      <Typography align="center"
      sx={{
        fontFamily: '"Nunito", sans-serif',  
        fontWeight: '600',
        color: 'gray', 
      }}>
        &copy; {new Date().getFullYear()} Attendify
      </Typography>
    </Box>
  );
};

export default Footer;
