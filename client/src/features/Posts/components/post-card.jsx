import { Chip, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeletePost from './delete-post';
import EditPost from './edit-post';
import LikePost from './like-post';

dayjs.extend(localizedFormat);

function PostCard({ post, onLike, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useSelector((state) => state.user);
  const isAuth = useAuth();

  const {
    title,
    description,
    createdAt,
    _id: postId,
    likes,
    author: { name, _id: authorId },
    tags,
  } = post;

  const handleLikePost = () => {
    if (!isAuth) {
      return navigate('/signin');
    }
    if (onLike) onLike(postId);
  };

  const handleDeletePost = () => {
    if (!isAuth) {
      return navigate('/signin');
    }
    if (onDelete) onDelete(postId);
  };

  return (
    <Stack rowGap={0.8}>
      <Link to={`/posts/${postId}`}>
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
          <Stack direction="row" alignItems="center" ml={4} spacing={3}>
            <LikePost likes={likes} id={profile?._id} onLike={handleLikePost} />
            <EditPost
              authorId={authorId}
              myId={profile?._id}
              postId={postId}
              pathname={location.pathname}
            />
            <DeletePost
              authorId={authorId}
              myId={profile?._id}
              pathname={location.pathname}
              onDelete={handleDeletePost}
            />
          </Stack>
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
