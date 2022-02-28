import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputLabel, Stack, Typography } from '@mui/material';
import { AvatarCustom, ButtonCustom, InputField, InputFile } from 'components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ModalProfile from './modal';

function ProfileForm({ onSubmit, profile, loading, onUnsetAvt, onUpdateAvt }) {
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
    if (!onUpdateAvt) return;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      const imgUrl = reader.result;

      onUpdateAvt(imgUrl);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    handleClose();
  };

  const handleUnsetAvt = () => {
    if (onUnsetAvt) onUnsetAvt();
    handleClose();
  };

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="flex-end">
        <InputLabel htmlFor="upload_image" sx={{ cursor: 'pointer' }}>
          <AvatarCustom url={profile?.avatar} size={3} />
        </InputLabel>
        <Box rowGap={2}>
          <Typography variant="h7">{profile.name}</Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'common.blue',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'common.dark_blue' },
            }}
            onClick={handleOpen}
          >
            Change Avatar
          </Typography>
        </Box>
      </Stack>
      <ModalProfile
        open={open}
        onClose={handleClose}
        onSetFile={handleSetFile}
        onUnsetAvt={handleUnsetAvt}
      />
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <InputField name="name" label="Name" height="44px" control={control} />
        <InputFile control={control} name="imgFile" onSetFile={handleSetFile} />
        <Box mt="10px">
          <ButtonCustom disabled={loading} parentIconWidth="16px" iconSize="1rem" spacing="0.2rem">
            Save
          </ButtonCustom>
        </Box>
      </Box>
    </>
  );
}

export default ProfileForm;
