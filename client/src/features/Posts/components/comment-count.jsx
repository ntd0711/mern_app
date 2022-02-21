import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

function CommentCount({ quantity, scrollToComment }) {
  return (
    <Stack alignItems="center" spacing={-0.8}>
      <IconButton
        onClick={() => scrollToComment()}
        size="small"
        sx={{
          color: 'common.grey_white',
          fontSize: '1.2rem',
          transition: 'color 0.2s ease',
        }}
      >
        <i className="bx bxs-comment"></i>
      </IconButton>
      <Typography variant="caption" color="#bcbcbc" mt={0.3}>
        {quantity}
      </Typography>
    </Stack>
  );
}

export default CommentCount;
