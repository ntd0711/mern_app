import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from 'api/posts-api';

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const handleSuccess = (response, variables) => {
    const { authorId, postId } = response;
    const posts = queryClient.getQueryData(['posts-user-created', { params: authorId }]);
    const newPosts = posts?.filter((post) => post._id !== postId);
    queryClient.setQueryData(['posts-user-created', { params: authorId }], newPosts);
  };

  const handleError = (err, variables, previousValue) => {
    console.log('errro');
    console.log({ err, variables, previousValue });
  };

  return useMutation(
    (id) => {
      return postsApi.deletePost(id);
    },
    {
      onSuccess: handleSuccess,
      onError: handleError,
    }
  );
};

export default useDeletePost;
