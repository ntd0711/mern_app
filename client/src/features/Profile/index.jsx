import { NotFound } from 'components';
import RequireAuth from 'components/hocs/require-auth';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/profile';
import ProfileSetting from './pages/profile-setting';

function ProfileFeature() {
  return (
    <Routes>
      <Route path="/setting" element={<RequireAuth component={<ProfileSetting />} />} />
      <Route path=":userId/*" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProfileFeature;
