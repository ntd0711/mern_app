import { Box, Container, Grid, Stack } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/post-card';
import PostFilters from '../components/post-filters';
import { fetchPosts, likePost } from '../posts-thunk';

function PostList() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { postList } = useSelector((state) => state.posts);

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            search: params?.search,
            tags: params?.tags,
        };
    }, [location.search]);

    useEffect(() => {
        console.log('fetch posts');
        // if (postList.length > 0) return;
        (async () => {
            try {
                await dispatch(fetchPosts(queryParams));
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch, queryParams]);

    const handleLike = async (id) => {
        try {
            await dispatch(likePost(id));
        } catch (error) {
            console.log(error);
        }
    };

    // if (postList.length === 0) return 'loading...';

    return (
        <Box mt={8}>
            <Container
                maxWidth="lg"
                sx={{
                    maxWidth: '1100px',
                    '@media (min-width: 1100px)': {
                        maxWidth: '1100px',
                    },
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Box mt={0.8}>
                            <PostFilters />
                        </Box>
                    </Grid>
                    {postList.length === 0 && <></>}
                    <Grid item xs={9}>
                        <Stack rowGap={8}>
                            {postList.map((post) => (
                                <PostCard onLike={handleLike} key={post._id} post={post} />
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
                {/* <Box mb={6}></Box> */}
            </Container>
        </Box>
    );
}

export default PostList;
