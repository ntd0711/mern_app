import { Box } from '@mui/material';
import useAuth from 'hooks/use-auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from './components/auth-form';
import { login, register } from './user-thunk';

function AuthFeature() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const isAuth = useAuth();
  const { loading } = useSelector((state) => state.user);
  const [error, setError] = useState('');

  const handleSwitchMode = () => {
    setIsSignUp((prevState) => !prevState);
    setError('');
  };

  const handleClearError = () => {
    setError('');
  };

  useEffect(() => {
    if (isAuth) navigate('/posts');
  }, [isAuth, navigate]);

  const handleOnSubmit = async (data) => {
    if (loading) return;
    try {
      if (isSignUp) {
        await dispatch(register(data)).unwrap();
      } else {
        const formData = { email: data.email, password: data.password };
        await dispatch(login(formData)).unwrap();
      }
    } catch (error) {
      console.log(error.message);
      error ? setError(error.message) : setError('');
    }
  };
  return (
    <Box
      sx={{
        maxWidth: '360px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 40px rgba(8,7,16,0.6)',
        padding: '50px 35px',
        margin: '0 auto',
      }}
    >
      <AuthForm
        error={error}
        isSignUp={isSignUp}
        onSubmit={handleOnSubmit}
        switchMode={handleSwitchMode}
        loading={loading}
        clearErrorFromServer={handleClearError}
      />
    </Box>
  );
}

export default AuthFeature;
