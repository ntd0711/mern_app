import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';

function MainLayout({ children }) {
    return (
        <Stack minHeight="100vh">
            <Link to="/blog">blog</Link>
            <Link to="/blog/123">blog detail</Link>
            <Box>
                <Header />
            </Box>

            <Box flexGrow={1}>{children}</Box>

            <Box>
                <Footer />
            </Box>
        </Stack>
    );
}

export default MainLayout;
