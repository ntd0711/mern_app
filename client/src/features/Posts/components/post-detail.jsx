import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { AvatarCustom } from 'components';
import { Link } from 'react-router-dom';

dayjs.extend(localizedFormat);

function PostDetail({ post, authorId, profile }) {
  const createMarkup = () => {
    return { __html: post?.content };
  };

  return (
    <>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'common.blue',
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {post?.title}
      </Typography>
      <Stack direction="row" spacing={1}>
        <AvatarCustom url={post.author.avatar} />
        <Box>
          <Link to={authorId === profile?._id ? '/profile' : `/profile/${authorId}`}>
            <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
              {post.author.name}
            </Typography>
          </Link>
          <Typography fontSize="12px">{dayjs(post.createdAt).format('ll')}</Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          '& figure': {
            position: 'relative',
          },
          '& iframe': {
            position: 'absolute',
            border: 'none',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
        dangerouslySetInnerHTML={createMarkup()}
      />
      <Typography component="span" variant="subtitle2">
        Tags:{' '}
        {post.tags.map((tag, index) => (
          <Link key={index} to={`/posts/?tag=${tag}`}>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: 'common.blue',
                transition: 'color 0.3s ease',
                '&:hover': { color: 'common.dark_blue' },
              }}
            >
              {index === post.tags.length - 1 ? tag : `${tag}, `}
            </Typography>
          </Link>
        ))}
      </Typography>
    </>
  );
}

export default PostDetail;
