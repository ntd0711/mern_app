import { IconButton } from '@mui/material';
import React from 'react';

function SharePost() {
  return (
    <IconButton
      size="small"
      sx={{
        fontSize: '1.2rem',
        color: 'common.grey_white',
        transition: 'color 0.2s ease',
      }}
    >
      <i className="bx bxs-share-alt"></i>
    </IconButton>
  );
}

export default SharePost;
