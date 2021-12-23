import { Box, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/blog-post';
import { fetchPosts, likePost } from '../posts-thunk';

function PostList() {
    const dispatch = useDispatch();
    const { postList } = useSelector((state) => state.posts);

    useEffect(() => {
        (async () => {
            try {
                await dispatch(fetchPosts());
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch]);

    const handleLike = async (id) => {
        try {
            await dispatch(likePost(id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Container sx={{ maxWidth: '1000px' }}>
                <Grid rowGap={3} container spacing={2}>
                    {postList?.map((post, index) => (
                        <Grid
                            main={index === 0 ? 'main' : ''}
                            key={post?._id}
                            item
                            xs={index === 0 ? 8 : 4}
                        >
                            <PostCard post={post} onLike={handleLike} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default PostList;
