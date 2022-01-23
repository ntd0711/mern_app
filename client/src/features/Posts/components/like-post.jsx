import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { IoTriangleOutline, IoTriangleSharp } from 'react-icons/io5';

function LikePost({ likes, id, onLike }) {
  const likedPost = likes.findIndex((x) => x === String(id)) !== -1;
  const handleLikePost = () => {
    if (onLike) onLike();
  };
  return (
    <>
      <IconButton
        onClick={handleLikePost}
        size="small"
        sx={{
          fontSize: '0.8rem',
          color: 'common.dark_blue',
          ml: 4,
        }}
      >
        {likedPost ? <IoTriangleSharp /> : <IoTriangleOutline />}
      </IconButton>
      <Typography variant="body2" mt={0.2}>
        {likes.length || ''}
      </Typography>
    </>
  );
}

export default LikePost;
