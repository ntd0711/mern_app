import { useQuery } from '@tanstack/react-query';
import { postsApi } from 'api/posts-api';

const usePosts = (params) => {
  const { data, isLoading, isError } = useQuery(['posts', { params }], fetchPostList, {
    cacheTime: Infinity,
    staleTime: 5000,
  });

  async function fetchPostList({ queryKey }) {
    const [_key, { params }] = queryKey;
    return await postsApi.getPosts(params);
  }

  return { posts: data, isLoadingPosts: isLoading, isErrorPosts: isError };
};

export default usePosts;
