import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MenuHeader(props) {
  const { open, anchorEl, onClose, onLogout } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 18,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => navigate('/profile')}>
        <ListItemIcon>
          <i style={{ fontSize: '20px' }} className="bx bx-user"></i>
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => navigate('/profile/setting')}>
        <ListItemIcon>
          <i style={{ fontSize: '20px' }} className="bx bx-wrench"></i>
        </ListItemIcon>
        Setting
      </MenuItem>
      <MenuItem onClick={() => navigate('posts/create')}>
        <ListItemIcon>
          <i style={{ fontSize: '20px' }} className="bx bx-pencil"></i>
        </ListItemIcon>
        Create Post
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <i style={{ fontSize: '20px' }} className="bx bx-log-out"></i>
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}

export default MenuHeader;
