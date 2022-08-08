import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from 'api/user-api';

const useSavePost = () => {
  const queryClient = useQueryClient();

  const handleMutate = async (variables) => {
    const { isSavedByUser, postId } = variables;

    await queryClient.cancelQueries(['post-detail', { postId }]);
    const post = queryClient.getQueryData(['post-detail', { postId }]);

    queryClient.setQueryData(['post-detail', { postId }], (prevPost) => {
      const newPost = { ...prevPost };
      newPost.savedByUser = !isSavedByUser;

      return newPost;
    });
    return post;
  };

  const handleError = (err, variables, previousValue) => {
    const { postId } = variables;
    queryClient.setQueryData(['post-detail', { postId }], previousValue);
  };

  const handleSettled = (data, error, variables) => {
    const { postId } = variables;
    queryClient.invalidateQueries(['post-detail', { postId }]);
  };

  return useMutation(
    (data) => {
      return userApi.savePost(data);
    },
    {
      onMutate: handleMutate,
      onError: handleError,
      onSettled: handleSettled,
    }
  );
};

export default useSavePost;
