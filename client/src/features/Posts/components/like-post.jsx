import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

function LikePost({ point, statusVote, onVote }) {
  const isLiked = statusVote === 'liked';

  const handleVote = () => {
    if (onVote) onVote();
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={handleVote}
        size="small"
        sx={{
          fontSize: '1rem',
          color: `${isLiked ? 'common.dark_blue' : '#ffffff80'}`,
          transition: 'color 0.2s ease',
        }}
      >
        <i className="bx bxs-up-arrow"></i>
      </IconButton>
      <Typography variant="body2" mt={0.3}>
        {point || ''}
      </Typography>
    </Stack>
  );
}

export default LikePost;
