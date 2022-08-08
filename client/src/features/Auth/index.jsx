import { Box } from '@mui/material';
import { userApi } from 'api/user-api';
import useUserAuth from 'hooks/query/user/use-login';
import useAuth from 'hooks/use-auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './components/auth-form';

function AuthFeature() {
  const { mutate, isLoading, isError, error: errorFromApi } = useUserAuth();

  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const isAuth = useAuth();
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

  useEffect(() => {
    setError(errorFromApi?.message || '');
  }, [isError, errorFromApi]);

  const handleOnSubmit = async (data) => {
    if (isLoading) return;
    if (isSignUp) {
      mutate(() => userApi.signup(data));
    } else {
      const formData = { email: data.email, password: data.password };
      mutate(() => userApi.signin(formData));
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
        loading={isLoading}
        clearErrorFromServer={handleClearError}
      />
    </Box>
  );
}

export default AuthFeature;
