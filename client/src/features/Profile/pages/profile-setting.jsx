import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { userApi } from 'api/user-api';
import TYPES from 'constants/action-types';
import useUpdateProfile from 'hooks/query/user/use-update-profile';
import useAuthStore from 'store/authStore';
import { notify } from 'utils/toastify';
import { ProfileForm } from '../components';

function ProfileSetting() {
  const { dispatch } = useAuthStore();
  const { user: profile } = useAuthStore();
  const { mutateAsync, isLoading } = useUpdateProfile();

  const handleOnSubmit = async (data) => {
    if (isLoading) return;
    try {
      const id = profile._id;
      const response = await mutateAsync(() => userApi.updateInfo({ id, data }));
      dispatch({ type: TYPES.CHANGE_INFO_USER, payload: response });

      notify.success('update info successfully!');
    } catch (error) {
      notify.error('update info failed.');
    }
  };

  const handleUnsetAvt = async () => {
    if (isLoading) return;
    if (!profile?.avatar) return;
    try {
      await mutateAsync(() => userApi.unsetAvatar(profile._id));
      dispatch({ type: TYPES.UNSET_AVATAR });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvt = async (imgUrl) => {
    if (isLoading) return;
    try {
      if (!imgUrl) throw new Error('image not found');
      const id = profile._id;
      const response = await mutateAsync(() => userApi.updateAvatar({ id, imgUrl }));
      dispatch({ type: TYPES.UPLOAD_AVATAR, payload: response });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box height="100%" mt={4}>
      <Container maxWidth="sm">
        <Paper
          sx={{
            py: 4,
            px: 2,
          }}
        >
          <ProfileForm
            profile={profile}
            loading={isLoading}
            onUnsetAvt={handleUnsetAvt}
            onUpdateAvt={handleUpdateAvt}
            onSubmit={handleOnSubmit}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default ProfileSetting;
