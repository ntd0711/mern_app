import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileCurrentUser from './pages/profile-current-user';
import ProfileOtherUser from './pages/profile-other-user';
import ProfileSetting from './pages/profile-setting';

function ProfileFeature() {
    return (
        <Routes>
            <Route path="/" element={<ProfileCurrentUser />} />
            <Route path=":id" element={<ProfileOtherUser />} />
            <Route path="/setting" element={<ProfileSetting />} />
        </Routes>
    );
}

export default ProfileFeature;
