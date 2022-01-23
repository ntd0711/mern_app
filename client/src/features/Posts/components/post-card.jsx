import { Chip, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLocalStorage } from 'utils/common';
import EditPost from './edit-post';
import LikePost from './like-post';

dayjs.extend(localizedFormat);

function PostCard({ post, onLike }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useSelector((state) => state.user);
  const token = getLocalStorage('token');
  const hasSignIn = !!(profile && token);

  const {
    title,
    description,
    createdAt,
    _id,
    likes,
    author: { name, _id: authorId },
    tags,
  } = post;

  const handleLikePost = () => {
    if (!hasSignIn) {
      return navigate('/signin');
    }
    if (onLike) onLike(_id);
  };

  return (
    <Stack rowGap={0.8}>
      <Link to={`/posts/${_id}`}>
        <Typography
          component="h2"
          variant="h5"
          sx={{
            color: 'common.blue',

            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {title}
        </Typography>
      </Link>
      <Box mt={-1}>
        <Stack direction="row" alignItems="center">
          <Typography variant="caption">{dayjs(createdAt).format('ll')}</Typography>
          <Box sx={{ width: '0.5px', height: '14px', bgcolor: 'common.grey_white', mx: 2 }} />
          <Link to={authorId === profile?._id ? '/profile' : `/profile/${authorId}`}>
            <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
              {name}
            </Typography>
          </Link>
          <LikePost likes={likes} id={profile?._id} onLike={handleLikePost} />
          <EditPost
            authorId={authorId}
            myId={profile?._id}
            postId={_id}
            pathname={location.pathname}
          />
        </Stack>
      </Box>
      <Box ml={-1}>
        {tags?.map((tag) => (
          <Chip
            key={tag}
            label={`#${tag}`}
            sx={{ height: '28px', ml: 1, fontSize: '0.8rem', color: '#eee' }}
            variant="outlined"
          />
        ))}
      </Box>
      <Typography mt={1.8}>{description}</Typography>
    </Stack>
  );
}

export default PostCard;
