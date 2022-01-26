import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ButtonCustom } from 'components';

export default function ModalDelete({ open, onDelete, onClose }) {
  const handleClose = (event, reason) => {
    if (onClose && reason !== 'backdropClick') onClose();
  };

  const handleDeletePost = () => {
    if (onDelete && onClose) {
      onDelete();
      onClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete the post?'}
        </DialogTitle>
        <DialogActions sx={{ p: 2.4 }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Disagree
          </Button>
          <Button variant="contained" onClick={handleDeletePost}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
