import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { AvatarCustom, InputField } from 'components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ModalProfile from './modal';

function ProfileForm({ onSubmit, profile, onUnsetAvt, onUpdateAvt }) {
    const [avatar, setAvatar] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const schema = yup.object().shape({
        name: yup
            .string()
            .required()
            .test('check title', 'title at least two word', (value) => {
                return value.split(' ').filter((x) => x.length >= 2).length >= 2;
            }),
    });

    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: profile?.name,
        },
        resolver: yupResolver(schema),
    });

    const handleOnSubmit = (data) => {
        if (onSubmit) onSubmit(data);
    };

    const handleSetFile = (file) => {
        const url = URL.createObjectURL(file);

        setAvatar(url);
        if (onUpdateAvt) onUpdateAvt(file);
        handleClose();
    };

    const handleUnsetAvt = () => {
        if (onUnsetAvt) onUnsetAvt();
        setAvatar();
        handleClose();
    };

    return (
        <>
            <AvatarCustom
                url={
                    avatar ||
                    (profile?.avatar?.filePath &&
                        `http://localhost:5000/${profile?.avatar.filePath}`) ||
                    ''
                }
                size={5}
            />
            <Button
                sx={{ textTransform: 'none' }}
                size="small"
                color_custom="pink"
                variant="outlined"
                onClick={handleOpen}
            >
                Change Avatar
            </Button>
            <ModalProfile
                open={open}
                onClose={handleClose}
                onSetFile={handleSetFile}
                onUnsetAvt={handleUnsetAvt}
            />
            <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                <InputField name="name" label="Name" control={control} />

                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </Box>
        </>
    );
}

export default ProfileForm;
