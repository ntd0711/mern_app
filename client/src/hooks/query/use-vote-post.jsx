import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from 'api/user-api';
import { VOTE_TYPES } from 'constants/action-types';
import { STATUS_VOTE } from 'constants/status-vote';

const useVotePost = (queryKey) => {
  const queryClient = useQueryClient();

  const handleMutate = async (variables) => {
    const { postId, params, voteType } = variables;
    await queryClient.cancelQueries([queryKey, { params }]);
    const postList = queryClient.getQueryData([queryKey, { params }]);

    queryClient.setQueryData([queryKey, { params }], (prevPostList) => {
      const index = prevPostList?.findIndex((post) => post?._id === postId);
      const postLiked = prevPostList[index];

      switch (voteType) {
        case VOTE_TYPES.WITHDRAW: {
          postLiked.point--;
          postLiked.statusVote = STATUS_VOTE.NOT_VOTE;
          return prevPostList;
        }
        case VOTE_TYPES.LIKE: {
          postLiked.point++;
          postLiked.statusVote = STATUS_VOTE.LIKED;
          return prevPostList;
        }
        default:
          break;
      }
    });

    return postList;
  };

  const handleError = (err, variables, previousValue) => {
    const { params } = variables;
    queryClient.setQueryData([queryKey, { params }], previousValue);
  };

  const handleSettled = (data, error, variables) => {
    const { params } = variables;
    // if (!error) return;
    queryClient.invalidateQueries([queryKey, { params }]);
  };

  return useMutation(
    (data) => {
      return userApi.vote(data);
    },
    {
      onMutate: handleMutate,
      onError: handleError,
      onSettled: handleSettled,
    }
  );
};

export default useVotePost;
