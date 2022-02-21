import { Link as LinkMui5 } from '@mui/material';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function ActiveLink({ children, path }) {
  const resolved = useResolvedPath(path);
  const { pathname } = resolved;
  const match = useMatch({ path: pathname, end: true });

  return (
    <LinkMui5
      component={Link}
      sx={{
        '& > p': {
          transition: 'color .2s linear',
          color: `${match ? '#00c7d0' : ''}`,
          textDecoration: `${match ? 'underline' : 'none'}`,
        },
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none',
        },
      }}
      to={path}
    >
      {children}
    </LinkMui5>
  );
}

export default ActiveLink;
