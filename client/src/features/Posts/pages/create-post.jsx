import { Box, Container, Paper } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { notify } from 'utils/toastify';
import PostForm from '../components/post-form';
import { createPost } from '../posts-thunk';

function CreatePost() {
    const dispatch = useDispatch();

    const handleOnSubmit = async (data) => {
        try {
            await dispatch(createPost(data));
            notify.success('🦄 Create post successfully!');
        } catch (error) {
            console.log(error);
            notify.error('🦄 Failed');
        }
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
