import { NotFound } from 'components';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/profile';
import ProfileSetting from './pages/profile-setting';

function ProfileFeature() {
  return (
    <Routes>
      <Route path="/setting" element={<ProfileSetting />} />
      <Route path=":userId/*" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProfileFeature;
