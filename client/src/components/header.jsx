import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { AvatarCustom } from 'components';
import useLogout from 'hooks/query/user/use-logout';
import useAuth from 'hooks/use-auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from 'store/authStore';
import MenuHeader from './menu-header';

function Header() {
  const navigate = useNavigate();

  const isAuth = useAuth();
  const { user: profile, refreshToken, removeUser } = useAuthStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { mutateAsync: logout, isLoading } = useLogout();
  const handleLogout = async () => {
    try {
      await logout({ rfToken: refreshToken });
      removeUser();
      navigate('/signin');
    } catch (error) {}
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
            {isLoading ? (
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
