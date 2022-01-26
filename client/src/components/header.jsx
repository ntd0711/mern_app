import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { AvatarCustom } from 'components';
import { logout } from 'features/Auth/user-thunk';

import useAuth from 'hooks/useAuth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/common';
import MenuHeader from './menu-header';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const { profile } = useSelector((state) => state.user);
  const rfToken = getLocalStorage('refreshToken');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    try {
      await dispatch(logout({ rfToken })).unwrap();
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    console.log('ahihi');
  };

  return (
    <Box
      onScroll={handleScroll}
      sx={{
        bgcolor: 'common.dark',
        left: '0',
        right: '0',
        paddingY: 2,
        zIndex: '100',
        boxShadow: '0 0 5px rgba(255,255,255,0.1)',
        position: 'fixed',
      }}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link to="/posts">
            <Typography variant="h5" fontWeight="medium">
              Free Frontend
            </Typography>
          </Link>
          <Box>
            {!isAuth && (
              <Link to="/signin">
                <Typography
                  sx={{
                    p: '0.4em',

                    cursor: 'pointer',
                    '&:hover': { color: 'common.white' },
                    transition: 'color 0.2s',
                  }}
                >
                  LOGIN
                </Typography>
              </Link>
            )}

            {isAuth && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <IconButton onClick={handleShowMenu}>
                  <AvatarCustom url={profile?.avatar} size={2} />
                </IconButton>
                <Typography variant="subtitle2" ml={0.8}>
                  {profile?.name?.trim()}
                </Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
      <MenuHeader open={open} anchorEl={anchorEl} onClose={handleClose} onLogout={handleLogout} />
    </Box>
  );
}

export default Header;
