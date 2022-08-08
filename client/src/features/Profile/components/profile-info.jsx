import { Link as LinkMui5, Stack, Typography } from '@mui/material';
import { userApi } from 'api/user-api';
import { AvatarCustom } from 'components';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuthStore from 'store/authStore';

function ProfileInfo() {
  const { user: profile } = useAuthStore();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const isOtherUser = userId !== profile?._id;

  useEffect(() => {
    (async () => {
      try {
        const user = await userApi.getUserById(userId);

        setUser(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <Stack direction="row">
      <AvatarCustom url={user?.avatar} size={8.1} />
      <Stack spacing={2} mt={2} ml={10}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography component="h2" variant="h5">
            {user?.name}
          </Typography>
          {!isOtherUser && (
            <LinkMui5
              component={Link}
              sx={{
                transition: 'color .2s linear',
                color: 'common.blue',
                ':hover': {
                  color: 'common.dark_blue',
                },
              }}
              to="/profile/setting"
            >
              <i className="bx bx-cog bx-sm"></i>
            </LinkMui5>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProfileInfo;
