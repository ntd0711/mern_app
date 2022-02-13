import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function ButtonCustom({
  children,
  loading,
  btnSize = 'medium',
  iconSize,
  parentIconWidth = '26px',
  spacing = '0',
  fullWidth,
}) {
  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      type="submit"
      size={btnSize}
      sx={{
        fontWeight: '600',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: iconSize,
          color: '#080710',
          width: `${loading ? parentIconWidth : '0px'}`,
          overflow: 'hidden',
          transition: '0.3s ease-in-out',
          opacity: `${loading ? '1' : '0'}`,
          visibility: `${loading ? 'visible' : 'hidden'}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overFlow: 'hidden',
          mr: spacing,
        }}
      >
        <i className="bx bx-loader bx-spin"></i>
      </Box>
      {children}
    </Button>
  );
}

ButtonCustom.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  btnSize: PropTypes.string,
  iconSize: PropTypes.string,
  parentIconWidth: PropTypes.string,
  spacing: PropTypes.string,
};

export default ButtonCustom;
