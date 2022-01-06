import { Box, Container, Paper } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import PostForm from '../components/post-form';
import { createPost } from '../posts-thunk';

function CreatePost() {
    const dispatch = useDispatch();

    const handleOnSubmit = async (data) => {
        await dispatch(createPost(data));
    };

    return (
        <Box height="100%">
            <Container maxWidth="lg">
                <Paper sx={{ py: 4, px: 2 }}>
                    <PostForm onSubmit={handleOnSubmit} />
                </Paper>
            </Container>
        </Box>
    );
}

export default CreatePost;
