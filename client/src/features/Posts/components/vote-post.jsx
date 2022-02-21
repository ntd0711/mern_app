import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

function VotePost({ post, onLike, onDislike }) {
  const { _id: postId, statusVote, point } = post;

  const handleLike = () => {
    const voteType = statusVote === 'liked' ? 'withdraw' : 'like';
    onLike({ voteType, postId });
  };

  const handleDislike = () => {
    const voteType = statusVote === 'disliked' ? 'withdraw' : 'dislike';
    onDislike({ voteType, postId });
  };

  return (
    <Stack justifyContent="center" alignItems="center" spacing="0.5rem">
      <IconButton
        onClick={handleLike}
        size="small"
        sx={{
          fontSize: '1rem',
          color: `${statusVote === 'liked' ? 'common.dark_blue' : '#ffffff80'}`,
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
          color: `${statusVote === 'disliked' ? 'common.pink' : '#ffffff80'}`,
          transition: 'color 0.2s ease',
        }}
      >
        <i className="bx bxs-down-arrow"></i>
      </IconButton>
    </Stack>
  );
}

export default VotePost;
