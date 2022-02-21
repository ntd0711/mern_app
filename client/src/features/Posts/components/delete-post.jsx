import { Box, IconButton } from '@mui/material';
import ModalDelete from 'features/Posts/components/modal';
import React, { useState } from 'react';

function DeletePost({ authorId, myId, onDelete, pathname }) {
  const [open, setOpen] = useState(false);
  const isDelete = authorId === myId && pathname !== '/posts';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    handleClickOpen();
  };

  return (
    <>
      <Box>
        {isDelete ? (
          <IconButton
            size="small"
            sx={{ fontSize: '1.1rem', color: 'common.pink' }}
            onClick={handleClick}
          >
            <i className="bx bx-trash" title="delete post"></i>
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
      <ModalDelete open={open} onClose={handleClose} onDelete={onDelete} />
    </>
  );
}

export default DeletePost;
