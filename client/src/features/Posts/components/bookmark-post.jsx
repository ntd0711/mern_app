import { IconButton } from '@mui/material';
import React from 'react';

function BookmarkPost({ post, onSave }) {
  const { _id, savedByUser } = post;

  const handleSavePost = () => {
    if (onSave) onSave({ actionType: savedByUser ? 'unSave' : 'save', postId: _id });
  };

  return (
    <IconButton
      size="small"
      onClick={handleSavePost}
      sx={{
        fontSize: '1.2rem',
        color: `${savedByUser ? 'common.dark_blue' : '#ffffff80'}`,
        transition: 'color 0.2s ease',
      }}
    >
      <i className="bx bxs-bookmark"></i>
    </IconButton>
  );
}

export default BookmarkPost;
