import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { userApi } from 'api/user-api';
import { updateProfile } from 'features/Auth/user-slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from '../components/profile-form';

function ProfileSetting() {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.user);

    const handleOnSubmit = async (data) => {
        try {
            const newData = { ...data };
            newData.id = profile._id;

            const response = await userApi.updateInfo(newData);
            dispatch(updateProfile(response));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnsetAvt = async () => {
        try {
            const response = await userApi.unsetAvatar(profile._id);
            dispatch(updateProfile(response));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateAvt = async (imgFile) => {
        try {
            if (!imgFile) throw new Error('image file is not exist');

            const formData = new FormData();
            formData.set('imgFile', imgFile);
            formData.set('id', profile._id);

            const response = await userApi.updateAvatar(formData);
            dispatch(updateProfile(response));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box height="100%">
            <Container maxWidth="sm">
                <Paper sx={{ py: 4, px: 2 }}>
                    <ProfileForm
                        profile={profile}
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
