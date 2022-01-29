import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { userApi } from 'api/user-api';
import SkeletonPostDetail from 'features/Posts/components/skeleton-post-detail';
import { fetchPostByUserId } from 'features/Posts/posts-thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../components/profile-info';
import ProfileTabs from '../components/profile-tabs';

function ProfileOtherUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postList, loading } = useSelector((state) => state.posts);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const userPromise = userApi.getUserById(id);
        const postsPromise = dispatch(fetchPostByUserId(id));

        const [user, posts] = await Promise.all([userPromise, postsPromise]);

        setUser(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, id]);

  return (
    <Box mt={10}>
      <Container>
        {loading ? (
          <SkeletonPostDetail />
        ) : (
          <>
            <ProfileInfo isOtherUser={id} postQuantity={postList.length} profile={user} />
            <ProfileTabs posts={postList} />
          </>
        )}
      </Container>
    </Box>
  );
}

export default ProfileOtherUser;
