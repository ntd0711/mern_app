import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from './components/form-auth';
import { login, register } from './user-thunk';

function AuthFeature() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSwitchMode = () => {
        setIsSignUp((prevState) => !prevState);
    };

    const handleOnSubmit = async (data) => {
        try {
            if (isSignUp) {
                await dispatch(register(data));
            } else {
                const formData = { email: data.email, password: data.password };
                await dispatch(login(formData));
                navigate('/posts');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box height="100%">
            <Box maxWidth="500px" px={3} mx="auto">
                <Paper sx={{ py: 4, px: 2 }}>
                    <AuthForm
                        isSignUp={isSignUp}
                        onSubmit={handleOnSubmit}
                        switchMode={handleSwitchMode}
                    />
                </Paper>
            </Box>
        </Box>
    );
}

export default AuthFeature;
