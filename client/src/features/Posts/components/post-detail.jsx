import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AvatarCustom } from 'components';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import EditPost from './edit-post';

dayjs.extend(localizedFormat);

function PostDetail({ post, authorId, profile }) {
  const { _id: postId, author, title, content, tags, createdAt } = post;

  const location = useLocation();
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'common.blue',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack direction="row" spacing={1}>
          <AvatarCustom url={author?.avatar} size={2.4} />
          <Box>
            <Link to={authorId === profile?._id ? '/profile' : `/profile/${authorId}`}>
              <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {author?.name}
              </Typography>
            </Link>
            <Typography fontSize="12px">{dayjs(createdAt).format('ll')}</Typography>
          </Box>
        </Stack>
        <EditPost
          authorId={author?._id}
          myId={profile?._id}
          postId={postId}
          pathname={location.pathname}
        />
      </Stack>
      <Box
        sx={{
          lineHeight: '170%',
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
      <Typography component="span">
        Tags:{' '}
        {tags?.map((tag, index) => (
          <Link key={index} to={`/posts/?tag=${tag}`}>
            <Typography
              component="span"
              sx={{
                color: 'common.blue',
                transition: 'color 0.3s ease',
                '&:hover': { color: 'common.dark_blue' },
              }}
            >
              {index === tags.length - 1 ? tag : `${tag}, `}
            </Typography>
          </Link>
        ))}
      </Typography>
    </>
  );
}

export default PostDetail;
