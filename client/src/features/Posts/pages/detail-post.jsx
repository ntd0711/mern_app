import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { postsApi } from 'api/posts-api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toUpperCaseFirstLetter } from 'utils/common';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        (async () => {
            const response = await postsApi.getPostById(id);
            setPost(response);
        })();
    }, [id]);

    if (Object.keys(post).length === 0) return 'loading...';

    const createMarkup = () => {
        return { __html: post?.htmlContent || post?.content };
    };

    return (
        <>
            <Box mt={6}>
                <Container sx={{ color: '#eee' }}>
                    <Typography
                        component="h2"
                        variant="h4"
                        sx={{
                            color: 'common.pink',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            mb: '4rem',
                        }}
                    >
                        {toUpperCaseFirstLetter(post?.title)}
                    </Typography>
                    <Box dangerouslySetInnerHTML={createMarkup()}></Box>
                </Container>
            </Box>
        </>
    );
}

export default PostDetail;
