import { Avatar } from '@mui/material';
import React from 'react';

function AvatarCustom({ url, size }) {
  return (
    <Avatar
      sx={{
        width: `${size}rem`,
        height: `${size}rem`,
        fontSize: `${size * 0.9}rem`,
        bgcolor: 'grey.400',
        color: '#fff',
      }}
      src={url}
    >
      {!url && <i style={{ marginTop: `${size * 0.4}rem` }} class="bx bxs-user"></i>}
    </Avatar>
  );
}

export default AvatarCustom;
