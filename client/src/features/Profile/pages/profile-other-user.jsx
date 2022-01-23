import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { postsApi } from 'api/posts-api';
import { userApi } from 'api/user-api';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useRoutes } from 'react-router-dom';
import ProfileInfo from '../components/profile-info';
import ProfileTabs from '../components/profile-tabs';

function ProfileOtherUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const postsPromise = postsApi.getPostsByUserId(id);
        const userPromise = userApi.getUserById(id);

        const [user, posts] = await Promise.all([userPromise, postsPromise]);

        setUser(user);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, id]);

  if (posts.length === 0) return 'loading ...';
  return (
    <Box mt={10}>
      <Container>
        <ProfileInfo isOtherUser={id} postQuantity={posts.length} profile={user} />

        <ProfileTabs posts={posts} />
      </Container>
    </Box>
  );
}

export default ProfileOtherUser;
