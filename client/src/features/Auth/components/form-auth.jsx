import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputField, InputPassword } from 'components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function AuthForm({ isSignUp, switchMode, onSubmit }) {
    const schema = yup.object().shape({
        firstName: isSignUp
            ? yup.string().required().min(2, 'first name at least two characters')
            : null,
        lastName: isSignUp
            ? yup.string().required().min(2, 'first name at least two characters')
            : null,
        email: yup.string().required().email('please enter your email'),
        password: yup.string().required().min(6, 'password at least six characters'),
        confirmPassword: isSignUp
            ? yup
                  .string()
                  .required()
                  .oneOf([yup.ref('password')], 'password does not match')
            : null,
    });

    const { control, handleSubmit, clearErrors } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSwitchMode = () => {
        if (!switchMode) return;

        switchMode();
        clearErrors();
    };

    const handleOnSubmit = (data) => {
        if (onSubmit) {
            onSubmit(data);
        }
    };

    const SwitchModeElement = () => {
        return (
            <>
                {isSignUp ? (
                    <Typography>
                        'Already have an account?{' '}
                        <Typography
                            component="span"
                            sx={{
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                            onClick={handleSwitchMode}
                        >
                            Login
                        </Typography>
                    </Typography>
                ) : (
                    <Typography>
                        Don't have an account?{' '}
                        <Typography
                            component="span"
                            sx={{
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                            onClick={handleSwitchMode}
                        >
                            Sign up
                        </Typography>
                    </Typography>
                )}
            </>
        );
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            {isSignUp && (
                <Grid container spacing={{ xs: 0, md: 2 }}>
                    <Grid item xs={12} md={6}>
                        <InputField control={control} name="firstName" label="First Name" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputField control={control} name="lastName" label="Last Name" />
                    </Grid>
                </Grid>
            )}
            <InputField control={control} name="email" label="Email" />
            <InputPassword control={control} name="password" label="Password" />
            {isSignUp && (
                <InputPassword control={control} name="confirmPassword" label="Confirm Password" />
            )}
            <Button type="submit" sx={{ mt: 2, mb: 1 }} variant="contained" fullWidth>
                {isSignUp ? 'sign up' : 'login'}
            </Button>
            <SwitchModeElement />
        </Box>
    );
}

export default AuthForm;
