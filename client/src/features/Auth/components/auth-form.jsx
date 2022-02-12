import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { InputField, InputPassword } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SwitchMode from './switch-mode';

function AuthForm({ isSignUp, switchMode, onSubmit, loading, error, clearErrorFromServer }) {
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
  const [field, message] = error?.split('-');

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

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
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
        <InputField
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          clearErrorFromServer={clearErrorFromServer}
        />
        {error && field === 'email' && (
          <Typography ml={2} color="#d32f2f" fontSize="12px">
            {message}
          </Typography>
        )}
        <InputPassword
          control={control}
          name="password"
          label="Password"
          clearErrorFromServer={clearErrorFromServer}
        />
        {error && field === 'password' && (
          <Typography ml={2} color="#d32f2f" fontSize="12px">
            {message}
          </Typography>
        )}
        {isSignUp && (
          <>
            <InputPassword control={control} name="confirmPassword" label="Confirm Password" />
            {error && field === 'confirmPassword' && (
              <Typography ml={2} color="#d32f2f" fontSize="12px">
                {message}
              </Typography>
            )}
          </>
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
          <Box
            component="span"
            sx={{
              color: '#080710',
              width: `${loading ? '24px' : '0px'}`,
              overflow: 'hidden',
              transition: '0.3s ease-in-out',
              opacity: `${loading ? '1' : '0'}`,
              visibility: `${loading ? 'visible' : 'hidden'}`,
              display: 'flex',
              mr: '0.4rem',
            }}
          >
            <i class="bx bx-loader bx-spin bx-sm"></i>
          </Box>
          {isSignUp ? 'sign up' : 'login'}
        </Button>
        <Box mt={1}>
          <SwitchMode isSignUp={isSignUp} onSwitchMode={handleSwitchMode} />
        </Box>
      </Box>
    </>
  );
}

export default AuthForm;
