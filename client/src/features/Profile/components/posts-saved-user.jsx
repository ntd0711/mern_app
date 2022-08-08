import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { userApi } from 'api/user-api';
import PostList from 'features/Posts/components/post-list';

function PostsSavedUser({ myId, userId }) {
  const { data, isLoading } = useQuery(['posts-user-saved', { params: userId }], fetchPostList, {
    cacheTime: Infinity,
    staleTime: 5000,
  });

  async function fetchPostList({ queryKey }) {
    const [_key, { params }] = queryKey;
    const response = await userApi.getPostsSavedByUser(params);
    return response.savedPosts;
  }

  return (
    <Box>
      {isLoading ? (
        <Stack alignItems="center" mt={5}>
          <i style={{ color: '#f9f9f9' }} className="bx bx-loader bx-spin bx-md"></i>
        </Stack>
      ) : (
        <PostList posts={data} queryKeys="posts-user-saved" params={userId} />
      )}
    </Box>
  );
}

export default PostsSavedUser;
