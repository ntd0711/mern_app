import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from 'api/posts-api';

const useCommentPost = () => {
  const queryClient = useQueryClient();

  const handleSuccess = (newComment, variables) => {
    const { postId } = variables;
    const post = queryClient.getQueryData(['post-detail', { postId }]);
    post.comments?.unshift(newComment);
    queryClient.setQueryData(['posts', { postId }], post);
  };

  const handleError = (err, variables, previousValue) => {
    console.log({ err, variables, previousValue });
  };

  return useMutation(
    (data) => {
      return postsApi.commentPost(data);
    },
    {
      onSuccess: handleSuccess,
      onError: handleError,
    }
  );
};

export default useCommentPost;
