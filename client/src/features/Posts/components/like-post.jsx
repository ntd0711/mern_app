import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { IoTriangleOutline, IoTriangleSharp } from 'react-icons/io5';

function LikePost({ likes, id, onLike }) {
  const isLiked = likes.findIndex((x) => x === String(id)) !== -1;

  const handleLikePost = () => {
    if (onLike) onLike();
  };
  return (
    <Stack direction="row" spacing={-0.2} alignItems="center">
      <IconButton
        onClick={handleLikePost}
        size="small"
        sx={{
          fontSize: '0.8rem',
          color: 'common.dark_blue',
        }}
      >
        {isLiked ? <IoTriangleSharp /> : <IoTriangleOutline />}
      </IconButton>
      <Typography variant="body2">{likes.length || ''}</Typography>
    </Stack>
  );
}

export default LikePost;
