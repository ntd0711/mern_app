import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { AvatarCustom } from 'components';
import { logout } from 'features/Auth/user-thunk';
import useAuth from 'hooks/use-auth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/common';
import MenuHeader from './menu-header';

import { ReactComponent as IconLoading } from 'images/loading-logout.svg';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useAuth();
  const { profile, loading } = useSelector((state) => state.user);
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

  return (
    <Box
      sx={{
        bgcolor: 'common.dark',
        paddingY: 2,
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
            {loading ? (
              <IconLoading style={{ marginRight: '10px' }} />
            ) : (
              <>
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
      <MenuHeader open={open} anchorEl={anchorEl} onClose={handleClose} onLogout={handleLogout} />
    </Box>
  );
}

export default Header;
