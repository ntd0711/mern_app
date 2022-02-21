import Profile from 'features/Profile/pages/profile';
import React from 'react';
import { Outlet } from 'react-router-dom';

function ProfileLayout() {
  return (
    <>
      <Profile />
      <Outlet />
    </>
  );
}

export default ProfileLayout;
