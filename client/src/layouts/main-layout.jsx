import { Box, Stack } from '@mui/material';
import { Footer, Header } from 'components';
import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <Stack minHeight="100vh">
      <Header />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}

export default MainLayout;
