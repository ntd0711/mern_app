import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputField, InputPassword } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
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
    if (onSubmit) onSubmit(data);
  };

  const SwitchModeElement = () => {
    return (
      <>
        {isSignUp ? (
          <Typography>
            Already have an account?{' '}
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
    <>
      <Box
        sx={{
          maxWidth: '400px',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 40px rgba(8,7,16,0.6)',
          padding: '50px 35px',
        }}
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Typography
          sx={{ fontSize: '32px', fontWeight: 500, lineHeight: '42px', textAlign: 'center' }}
        >
          {isSignUp ? 'Register Here' : 'Login Here'}
        </Typography>
        {isSignUp && (
          <Grid container spacing={{ xs: 0, md: 2 }}>
            <Grid item xs={12} md={6}>
              <InputField
                control={control}
                name="firstName"
                label="First Name"
                placeholder="First Name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                control={control}
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
              />
            </Grid>
          </Grid>
        )}
        <InputField control={control} name="email" label="Email" placeholder="Email or Phone" />
        <InputPassword control={control} name="password" label="Password" />
        {isSignUp && (
          <InputPassword control={control} name="confirmPassword" label="Confirm Password" />
        )}
        <Button
          type="submit"
          sx={{
            '&:hover': {
              backgroundColor: '#eee',
            },
            marginTop: '30px',
            width: '100%',
            backgroundColor: '#eee',
            color: '#080710',
            padding: '15px 0',
            fontSize: '18px',
            fontWeight: 600,
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          variant="contained"
          fullWidth
        >
          {isSignUp ? 'sign up' : 'login'}
        </Button>
        <Box mt={1}>
          <SwitchModeElement />
        </Box>
      </Box>
    </>
  );
}

export default AuthForm;
