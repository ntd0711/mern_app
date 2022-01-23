import { Box } from '@mui/material';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from './components/auth-form';
import { login, register } from './user-thunk';

function AuthFeature() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const isAuth = useAuth();

  const handleSwitchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  // if (isAuth) navigate(-1);

  const handleOnSubmit = async (data) => {
    if (isSignUp) {
      await dispatch(register(data));
    } else {
      const formData = { email: data.email, password: data.password };
      await dispatch(login(formData));
      // navigate('/posts');
    }
  };
  return (
    <Box height="100%" display="flex" justifyContent="center" mt={6}>
      <AuthForm isSignUp={isSignUp} onSubmit={handleOnSubmit} switchMode={handleSwitchMode} />
    </Box>
  );
}

export default AuthFeature;
