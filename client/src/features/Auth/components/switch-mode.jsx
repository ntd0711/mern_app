import { Typography } from '@mui/material';
import React from 'react';

function SwitchMode({ isSignUp, onSwitchMode }) {
  const handleSwitchMode = () => {
    if (onSwitchMode) onSwitchMode();
  };

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
}

export default SwitchMode;
