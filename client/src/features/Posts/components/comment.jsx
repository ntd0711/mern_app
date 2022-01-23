import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AvatarCustom } from 'components';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
dayjs.extend(relativeTime);

function Comment({ cmt, authorId, profile }) {
  const isAuthorComment = authorId === cmt.user._id;
  const href = authorId === profile?._id ? '/profile' : `/profile/${authorId}`;

  return (
    <Stack direction="row" alignItems="start" key={cmt._id}>
      <AvatarCustom url={cmt.user.avatar} size={2.4} />
      <Box flexBasis="100%" ml={1.6}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: '-2px', mb: '10px' }}
        >
          <Stack direction="row" alignItems="center" spacing={0.6}>
            <Link to={href}>
              <Typography
                sx={{ fontSize: '13px', flexBasis: '100%' }}
                variant="subtitle2"
                component="span"
              >
                {cmt.user.name}
              </Typography>
            </Link>
            {isAuthorComment && (
              <Typography
                component="span"
                caption="small"
                sx={{
                  p: '2px 6px',
                  borderRadius: '3px',
                  bgcolor: 'common.light_dark',
                  color: 'common.dark_blue',
                }}
              >
                author
              </Typography>
            )}
          </Stack>
          <Typography sx={{ whiteSpace: 'nowrap' }} caption="small">
            {dayjs(cmt.createdAt).fromNow()}
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: '13px',
            lineHeight: '18px',
            display: ' block',
            padding: ' 15px 20px 20px 20px',
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        >
          {cmt.text}
        </Typography>
      </Box>
    </Stack>
  );
}

export default Comment;
