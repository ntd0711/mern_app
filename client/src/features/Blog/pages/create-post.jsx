import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import FormCreate from '../components/form-create';

function CreatePost() {
    const { profile, token } = useSelector((state) => state.user);
    const hasSignIn = !!(profile && token);

    return (
        <Box height="100%">
            <Container maxWidth="sm">
                <Paper sx={{ py: 4, px: 2 }}>
                    {hasSignIn ? (
                        <FormCreate />
                    ) : (
                        <Typography sx={{ textAlign: 'center' }}>
                            Please sign in to create your own post and like other's post
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}

export default CreatePost;
