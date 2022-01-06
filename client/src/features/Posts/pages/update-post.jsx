import { Box, Container, Paper } from '@mui/material';
import { postsApi } from 'api/posts-api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from '../components/post-form';

function UpdatePost() {
    const { id } = useParams();
    const [postNeedUpdate, setPostNeedUpdate] = useState({});

    useEffect(() => {
        (async () => {
            const response = await postsApi.getPostById(id);
            setPostNeedUpdate(response);
        })();
    }, [id]);

    const handleOnSubmit = (data) => {
        console.log(data);
    };

    if (Object.keys(postNeedUpdate).length === 0) return 'loading...';
    return (
        <Box height="100%">
            <Container maxWidth="lg">
                <Paper sx={{ py: 4, px: 2 }}>
                    <PostForm onSubmit={handleOnSubmit} post={postNeedUpdate} />
                </Paper>
            </Container>
        </Box>
    );
}

export default UpdatePost;
