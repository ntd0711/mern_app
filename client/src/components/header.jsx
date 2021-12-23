import { Box, Container, Stack, Typography } from '@mui/material';
import { logout } from 'features/Auth/user-slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, token } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <Box py={2}>
            <Container>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h4">Header</Typography>
                    <Typography variant="h4">
                        {profile?.name[0].toUpperCase()}{' '}
                        <Typography component="span">{profile?.name}</Typography>
                    </Typography>
                    <Box>
                        <Typography>
                            <Link to="/">home</Link>
                        </Typography>
                        <Typography>
                            <Link to="/blog">blog</Link>
                        </Typography>
                        <Typography>
                            <Link to="/blog/create">create post</Link>
                        </Typography>
                        <Typography>
                            <Link to="/signin">login</Link>
                        </Typography>
                        <Typography sx={{ cursor: 'pointer' }} onClick={handleLogout}>
                            logout
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

export default Header;
