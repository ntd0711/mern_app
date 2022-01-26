import { Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';

function SkeletonPosts({ quantity }) {
  return (
    <Stack spacing={6}>
      {Array.from({ length: quantity }).map((x, i) => (
        <Stack key={i}>
          <Typography variant="h5">
            <Skeleton animation="wave" />
          </Typography>
          <Typography variant="h5">
            <Skeleton animation="wave" width="40%" />
          </Typography>
          <Typography variant="subtitle2">
            <Skeleton animation="wave" width="30%" />
          </Typography>
          <Skeleton animation="wave" variant="rectangular" height={80} sx={{ mt: '0.4rem' }} />
        </Stack>
      ))}
    </Stack>
  );
}

export default SkeletonPosts;
