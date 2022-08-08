import { useQuery } from '@tanstack/react-query';
import { postsApi } from 'api/posts-api';

const usePostTags = () => {
  const { data, isLoading, isError } = useQuery(['tags'], fetchPostTags, {
    cacheTime: Infinity,
    staleTime: 5000,
  });
  async function fetchPostTags() {
    return await postsApi.getTags();
  }
  return { postTags: data, isLoadingTags: isLoading, isErrorTags: isError };
};

export default usePostTags;
