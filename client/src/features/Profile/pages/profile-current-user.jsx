import { Box, Container } from '@mui/material';
import { postsApi } from 'api/posts-api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInfo from '../components/profile-info';
import ProfileTabs from '../components/profile-tabs';

function ProfileCurrentUser() {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const postCreatedByUser = await postsApi.getPostsByUserId(profile._id);
                setPosts(postCreatedByUser);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch, profile._id]);

    if (posts.length === 0) return 'loading ...';

    return (
        <Box mt={10}>
            <Container>
                <ProfileInfo postQuantity={posts.length} profile={profile} />
                <ProfileTabs posts={posts} />
            </Container>
        </Box>
    );
}

export default ProfileCurrentUser;
