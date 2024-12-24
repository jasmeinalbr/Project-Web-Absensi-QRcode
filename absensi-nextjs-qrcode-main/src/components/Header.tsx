import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import { Menu } from '@mui/icons-material';

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  
  return (
    <>
      <AppBar position="fixed" sx={{height:'64px', backgroundColor: '#0F163B'}}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarOpen}>
              <Menu />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/img/logo.png" alt="Logo" style={{ width: 40, height: 40, marginRight: 16, marginLeft: 16 }} />
          <Typography 
          variant="h6"
          sx={{
            fontFamily: '"Nunito", sans-serif',  
            fontWeight: '600',
            color: 'white', 
          }}
          >Attendify</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default Header;
