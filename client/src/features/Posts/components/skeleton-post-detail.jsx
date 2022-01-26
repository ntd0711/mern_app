import { Skeleton, Stack } from '@mui/material';
import React from 'react';

function SkeletonPostDetail() {
  return (
    <Stack spacing={1}>
      <Skeleton animation="wave" width="30%" height={40} />

      <Skeleton animation="wave" variant="rectangular" height={80} />

      <Skeleton animation="wave" height={40} />

      <Skeleton animation="wave" height={40} sx={{}} />
    </Stack>
  );
}

export default SkeletonPostDetail;
