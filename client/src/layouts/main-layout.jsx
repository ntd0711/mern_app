import { Box, Stack } from '@mui/material';
import { Footer, Header } from 'components';
import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <Box>
      <Stack minHeight="100vh">
        <Header />
        <Box flexGrow={1} mt={15}>
          <Outlet />
        </Box>
      </Stack>
      <Box mt={12} py={4}>
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;
