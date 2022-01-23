import { yupResolver } from '@hookform/resolvers/yup';
import { InputLabel, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

function ModalProfile({ open, onClose, onSetFile, onUnsetAvt }) {
  const style = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const schema = yup.object().shape({
    imgFile: yup.mixed().required(),
  });

  const { control } = useForm({
    defaultValues: {
      imgFile: undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleUnsetAvt = () => {
    if (onUnsetAvt) onUnsetAvt();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown
    >
      <Box sx={style}>
        <InputLabel htmlFor="upload_image">
          <Typography
            sx={{
              color: 'common.black',
              cursor: 'pointer',
              '&:hover': { color: 'common.blue' },
            }}
          >
            Upload Image
          </Typography>
        </InputLabel>
        <Typography
          sx={{
            color: 'common.black',
            cursor: 'pointer',
            '&:hover': { color: 'common.blue' },
          }}
          onClick={handleUnsetAvt}
        >
          Unset Image
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalProfile;
