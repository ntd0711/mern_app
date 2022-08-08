import { useQuery } from '@tanstack/react-query';
import { postsApi } from 'api/posts-api';
import { useEffect, useState } from 'react';

const useDetailPost = (postId) => {
  const [pageError, setPageError] = useState();

  const { data, isLoading, isError, error } = useQuery(['post-detail', { postId }], fetchPostById, {
    cacheTime: Infinity,
    staleTime: 5000,
  });

  useEffect(() => {
    setPageError(error?.message);
  }, [error]);

  async function fetchPostById({ queryKey }) {
    const [_key, { postId }] = queryKey;
    return await postsApi.getPostById(postId);
  }

  return { post: data, isLoading, isError, pageError };
};

export default useDetailPost;
