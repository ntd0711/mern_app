import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h2>Page Not Found</h2>
      <Link to="/posts">
        <Typography >Go Home</Typography>
      </Link>
    </>
  );
}

export default NotFound;
