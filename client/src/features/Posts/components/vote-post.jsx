import { IconButton, Stack, Typography } from '@mui/material';
import { VOTE_TYPES } from 'constants/action-types';
import { STATUS_VOTE } from 'constants/status-vote';
function VotePost({ post, onLike, onDislike }) {
  const { _id: postId, statusVote, point } = post;

  const handleLike = () => {
    const voteType = statusVote === STATUS_VOTE.LIKED ? VOTE_TYPES.WITHDRAW : VOTE_TYPES.LIKE;
    onLike({ voteType, postId });
  };

  const handleDislike = () => {
    const voteType = statusVote === STATUS_VOTE.DISLIKED ? VOTE_TYPES.WITHDRAW : VOTE_TYPES.DISLIKE;
    onDislike({ voteType, postId });
  };

  return (
    <Stack justifyContent="center" alignItems="center" spacing="0.5rem">
      <IconButton
        onClick={handleLike}
        size="small"
        sx={{
          fontSize: '1rem',
          color: `${statusVote === STATUS_VOTE.LIKED ? 'common.dark_blue' : '#ffffff80'}`,
          transition: 'color 0.2s ease',
        }}
      >
        <i className="bx bxs-up-arrow"></i>
      </IconButton>
      <Typography>{point}</Typography>
      <IconButton
        onClick={handleDislike}
        sx={{
          fontSize: '1rem',
          color: `${statusVote === STATUS_VOTE.DISLIKED ? 'common.pink' : '#ffffff80'}`,
          transition: 'color 0.2s ease',
        }}
      >
        <i className="bx bxs-down-arrow"></i>
      </IconButton>
    </Stack>
  );
}

export default VotePost;
