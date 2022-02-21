import { Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import {
  ProfileInfo,
  ProfileTabs,
  PostsCreatedUser,
  PostsSavedUser,
  AboutUser,
} from '../components';

function Profile() {
  const { userId } = useParams();
  const { profile } = useSelector((state) => state.user);

  return (
    <Box mt={10}>
      <Container>
        <Stack spacing={3}>
          <ProfileInfo />
          <ProfileTabs myId={profile._id} userId={userId} />
          <Routes>
            <Route index element={<PostsCreatedUser userId={userId} />} />
            {profile._id === userId && (
              <Route path="saved" element={<PostsSavedUser myId={profile._id} userId={userId} />} />
            )}
            <Route path="about" element={<AboutUser />} />
          </Routes>
        </Stack>
      </Container>
    </Box>
  );
}

export default Profile;
