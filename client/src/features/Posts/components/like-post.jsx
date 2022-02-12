import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

function LikePost({ likes, id, onLike }) {
  const isLiked = likes.findIndex((x) => x === String(id)) !== -1;

  const handleLikePost = () => {
    if (onLike) onLike();
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={handleLikePost}
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
        {likes.length || ''}
      </Typography>
    </Stack>
  );
}

export default LikePost;
