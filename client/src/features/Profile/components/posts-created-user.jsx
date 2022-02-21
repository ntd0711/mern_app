import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { generateKeyPost } from 'constants/key-constants';
import { getPostsCreatedByUser } from 'features/Auth/user-thunk';
import PostList from 'features/Posts/components/post-list';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PostsCreatedUser({ userId }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  const postList = posts[generateKeyPost.createdByUser(userId)];

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getPostsCreatedByUser(userId)).unwrap();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId, dispatch]);

  return (
    <Box>
      {loading ? (
        <Stack alignItems="center" mt={5}>
          <i style={{ color: '#f9f9f9' }} className="bx bx-loader bx-spin bx-md"></i>
        </Stack>
      ) : (
        <PostList posts={postList} />
      )}
    </Box>
  );
}

export default PostsCreatedUser;
