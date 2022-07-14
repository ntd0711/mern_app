import { Box, Stack } from '@mui/material';
import { Footer, Header } from 'components';
import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <Box className="main__layout">
      <Stack minHeight="100vh">
        <Header />
        <Box className="main" flexGrow={1} mt={15}>
          <Outlet />
        </Box>
      </Stack>
      <Box className="footer" mt={12} py={4}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;
