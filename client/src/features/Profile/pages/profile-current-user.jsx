import { Box, Container } from '@mui/material';
import SkeletonPostDetail from 'features/Posts/components/skeleton-post-detail';
import { fetchPostByUserId } from 'features/Posts/posts-thunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInfo from '../components/profile-info';
import ProfileTabs from '../components/profile-tabs';

function ProfileCurrentUser() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { postList, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchPostByUserId(profile._id));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, profile._id]);

  return (
    <Box mt={10}>
      <Container>
        {loading ? (
          <SkeletonPostDetail />
        ) : (
          <>
            <ProfileInfo postQuantity={postList.length} profile={profile} />
            <ProfileTabs posts={postList} />
          </>
        )}
      </Container>
    </Box>
  );
}

export default ProfileCurrentUser;
