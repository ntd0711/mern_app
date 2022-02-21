import { Box, Stack } from '@mui/material';
import { generateKeyPost } from 'constants/key-constants';
import { getPostsSavedByUser } from 'features/Auth/user-thunk';
import PostList from 'features/Posts/components/post-list';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PostsSavedUser({ myId, userId }) {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  const postList = posts[generateKeyPost.savedByUser(userId)];

  useEffect(() => {
    if (myId !== userId) return;

    (async () => {
      try {
        await dispatch(getPostsSavedByUser()).unwrap();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [myId, userId, dispatch]);

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

export default PostsSavedUser;
