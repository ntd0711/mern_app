import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from 'api/user-api';
import { VOTE_TYPES } from 'constants/action-types';
import { STATUS_VOTE } from 'constants/status-vote';

const useVoteDetailPost = () => {
  const queryClient = useQueryClient();

  const handleMutate = async (variables) => {
    const { postId, voteType } = variables;
    await queryClient.cancelQueries(['post-detail', { postId }]);
    const post = queryClient.getQueryData(['post-detail', { postId }]);

    queryClient.setQueryData(['post-detail', { postId }], (prevPost) => {
      console.log({ voteType, statusVote: prevPost.statusVote });
      switch (voteType) {
        case VOTE_TYPES.WITHDRAW: {
          if (prevPost.statusVote === STATUS_VOTE.LIKED) {
            prevPost.point--;
          }
          if (prevPost.statusVote === STATUS_VOTE.DISLIKED) {
            prevPost.point++;
          }
          prevPost.statusVote = STATUS_VOTE.NOT_VOTE;
          return prevPost;
        }
        case VOTE_TYPES.LIKE: {
          if (prevPost.statusVote === STATUS_VOTE.NOT_VOTE) {
            prevPost.point++;
          }
          if (prevPost.statusVote === STATUS_VOTE.DISLIKED) {
            prevPost.point += 2;
          }
          prevPost.statusVote = STATUS_VOTE.LIKED;
          return prevPost;
        }
        case VOTE_TYPES.DISLIKE: {
          if (prevPost.statusVote === STATUS_VOTE.NOT_VOTE) {
            prevPost.point--;
          }
          if (prevPost.statusVote === STATUS_VOTE.LIKED) {
            prevPost.point -= 2;
          }
          prevPost.statusVote = STATUS_VOTE.DISLIKED;
          return prevPost;
        }
        default:
          break;
      }
    });
    return post;
  };

  const handleError = (err, variables, previousValue) => {
    const { postId } = variables;
    queryClient.setQueryData(['post-detail', { postId }], previousValue);
  };

  const handleSettled = (data, error, variables) => {
    const { postId } = variables;
    // if (!error) return;
    queryClient.invalidateQueries(['post-detail', { postId }]);
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

export default useVoteDetailPost;
