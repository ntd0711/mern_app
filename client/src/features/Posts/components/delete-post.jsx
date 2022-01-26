import { Box, IconButton } from '@mui/material';
import ModalDelete from 'features/Auth/components/modal';
import React from 'react';
import { BsTrashFill } from 'react-icons/bs';

function DeletePost({ authorId, myId, onDelete, pathname }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isDelete = authorId === myId && pathname === '/profile';

  const handleClick = () => {
    handleClickOpen();
  };

  return (
    <>
      <Box>
        {isDelete ? (
          <IconButton
            size="small"
            sx={{ fontSize: '0.9rem', color: 'common.pink' }}
            onClick={handleClick}
          >
            <BsTrashFill title="delete post" />
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
