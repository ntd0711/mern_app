import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { unsetAvatar, updateAvatar, updateInfo } from 'features/Auth/user-thunk';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'utils/toastify';
import ProfileForm from '../components/profile-form';

function ProfileSetting() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);

  const handleOnSubmit = async (data) => {
    try {
      const id = profile._id;
      await dispatch(updateInfo({ id, data })).unwrap();

      notify.success('update info successfully!');
    } catch (error) {
      notify.error('update info failed.');
    }
  };

  const handleUnsetAvt = async () => {
    try {
      await dispatch(unsetAvatar(profile._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvt = async (imgUrl) => {
    try {
      if (!imgUrl) throw new Error('image not found');

      const id = profile._id;
      await dispatch(updateAvatar({ id, imgUrl }));
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
            loading={loading}
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
