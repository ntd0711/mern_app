import {
    Box,
    Container,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import { AvatarCustom } from 'components';
import { logout } from 'features/Auth/user-slice';
import jwt_decode from 'jwt-decode';
import React, { useEffect } from 'react';
import { IoCreateSharp, IoLogOut, IoPersonSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toUpperCaseFirstLetter } from 'utils/common';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { profile, token } = useSelector((state) => state.user);
    const authenticated = profile && token;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!token) return;

        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 < new Date().getTime()) dispatch(logout());
    }, [location, token, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    const handleShowMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box py={2}>
            <Container>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Link to="/posts">
                        <Typography variant="h5" fontWeight="medium">
                            Free Frontend
                        </Typography>
                    </Link>
                    <Box>
                        {!authenticated && (
                            <Link to="/signin">
                                <Typography
                                    sx={{
                                        p: '0.4em',

                                        color: 'common.text_white',
                                        cursor: 'pointer',
                                        '&:hover': { color: 'common.pink' },
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    LOGIN
                                </Typography>
                            </Link>
                        )}

                        {authenticated && (
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <IconButton onClick={handleShowMenu}>
                                    <AvatarCustom
                                        url={
                                            profile?.avatar?.filePath &&
                                            `http://localhost:5000/${profile?.avatar.filePath}`
                                        }
                                        size={2}
                                    />
                                </IconButton>
                                <Typography variant="subtitle2" ml={0.8}>
                                    {toUpperCaseFirstLetter(profile?.name)}
                                </Typography>
                            </Stack>
                        )}
                    </Box>
                </Stack>
            </Container>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
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
                            left: 22,
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
                <MenuItem onClick={() => navigate(`profile`)}>
                    <ListItemIcon>
                        <IoPersonSharp fontSize="18" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => navigate('posts/create')}>
                    <ListItemIcon>
                        <IoCreateSharp fontSize="18" />
                    </ListItemIcon>
                    Create Post
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <IoLogOut fontSize="18" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default Header;
