import { Chip, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { VOTE_TYPES } from 'constants/action-types';
import { STATUS_VOTE } from 'constants/status-vote';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import useAuth from 'hooks/use-auth';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeletePost from './delete-post';
import EditPost from './edit-post';
import LikePost from './like-post';

dayjs.extend(localizedFormat);

function PostCard({ post, onVote, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useSelector((state) => state.user);
  const isAuth = useAuth();

  const {
    title,
    description,
    createdAt,
    _id: postId,
    statusVote,
    point,
    author: { name, _id: authorId },
    tags,
  } = post;

  const handleVote = () => {
    if (!isAuth) {
      return navigate('/signin');
    }
    if (onVote) {
      const voteType = statusVote === STATUS_VOTE.LIKED ? VOTE_TYPES.WITHDRAW : VOTE_TYPES.LIKE;
      onVote({ voteType, postId });
    }
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
      <Box>
        <Stack direction="row" alignItems="center">
          <Typography variant="caption">{dayjs(createdAt).format('ll')}</Typography>
          <Box sx={{ width: '0.5px', height: '14px', bgcolor: 'common.grey_white', mx: 2 }} />
          <Link to={`/profile/${authorId}`}>
            <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
              {name}
            </Typography>
          </Link>
          <Stack direction="row" alignItems="center" ml={4} spacing={3}>
            <LikePost point={point} statusVote={statusVote} onVote={handleVote} />
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
