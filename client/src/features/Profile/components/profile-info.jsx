import { Button, Stack, Typography } from '@mui/material';
import { AvatarCustom } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';

function ProfileInfo({ profile, postQuantity, isOtherUser }) {
  return (
    <Stack direction="row">
      <AvatarCustom url={profile?.avatar} size={8.1} />
      <Stack spacing={2} mt={2} ml={10}>
        <Stack direction="row" spacing={4}>
          <Typography component="h2" variant="h5">
            {profile?.name}
          </Typography>
          {!isOtherUser && (
            <Link to="/profile/setting">
              <Button
                sx={{
                  textTransform: 'none',
                  color: 'common.grey_white',
                  borderColor: 'common.grey_white',
                  '&:hover': { borderColor: 'common.grey_white' },
                  height: '32px',
                }}
                variant="outlined"
              >
                Edit Profile
              </Button>
            </Link>
          )}
        </Stack>
        {postQuantity ? (
          <Typography fontSize="1rem" variant="subtitle2">
            {postQuantity}{' '}
            <Typography component="span" variant="body1">
              posts
            </Typography>
          </Typography>
        ) : (
          ''
        )}
      </Stack>
    </Stack>
  );
}

export default ProfileInfo;
