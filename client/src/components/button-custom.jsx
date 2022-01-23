import { Button } from '@mui/material';
import React from 'react';

function ButtonCustom({ children, size, onClick, disabled, type }) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Button
      type={type}
      onClick={handleClick}
      size={size}
      disabled={disabled}
      sx={{
        '&:hover': {
          backgroundColor: '#b6b6b6',
        },
        backgroundColor: '#eee',
        color: '#080710',
        fontWeight: 600,
        cursor: 'pointer',
        '&.Mui-disabled': {
          color: '#b6b6b6',
          bgcolor: 'rgba(255,255,255,0.05)',
        },
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
