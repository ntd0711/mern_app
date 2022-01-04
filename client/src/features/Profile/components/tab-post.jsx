import { Box, Container, Stack, Typography } from '@mui/material';
import PostCard from 'features/Posts/components/post-card';
import React from 'react';

function TabPost({ posts }) {
    return (
        <Box mt={8}>
            <Stack rowGap={10}>
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </Stack>
        </Box>
    );
}

export default TabPost;
