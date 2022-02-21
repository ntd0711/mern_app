import { Stack, Typography } from '@mui/material';
import { ActiveLink } from 'components';

import React from 'react';
function ProfileTabs({ myId, userId }) {
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <ActiveLink path="">
        <Typography>Posts</Typography>
      </ActiveLink>
      {myId === userId && (
        <ActiveLink path="saved">
          <Typography>Saved</Typography>
        </ActiveLink>
      )}
      <ActiveLink path="about">
        <Typography>About</Typography>
      </ActiveLink>
    </Stack>
  );
}

export default ProfileTabs;
