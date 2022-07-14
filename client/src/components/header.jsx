import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { AvatarCustom } from 'components';
import { logout } from 'features/Auth/user-thunk';
import useAuth from 'hooks/use-auth';
import React from 'react';
import { useState } from 'react';
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);

      await dispatch(logout({ rfToken })).unwrap();
      navigate('/signin');
    } catch (error) {
      setLoadingLogout(false);
      console.log(error);
    } finally {
      setLoadingLogout(false);
    }
  };

  const handleShowMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className="header"
      sx={{
        bgcolor: 'common.dark',
        pt: 3,
        pb: 2,
        left: '0',
        right: '0',
        position: 'fixed',
        zIndex: '100',
        boxShadow: '0 0 5px rgba(255,255,255,0.06)',
      }}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Typography component="h1" variant="h5" fontWeight="800">
              Free Frontend
            </Typography>
          </Link>
          <Box>
            {loadingLogout ? (
              <i style={{ color: '#f9f9f9' }} className="bx bx-loader bx-spin bx-sm"></i>
            ) : (
              <>
                {!isAuth && (
                  <Link to="/signin">
                    <Typography
                      variant="body2"
                      sx={{
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
                    <Typography
                      onClick={handleShowMenu}
                      variant="subtitle2"
                      sx={{ ml: '0.8', cursor: 'pointer' }}
                    >
                      {profile?.name?.trim()}
                    </Typography>
                  </Stack>
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
      <MenuHeader
        userId={profile?._id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onLogout={handleLogout}
      />
    </Box>
  );
}

export default Header;
