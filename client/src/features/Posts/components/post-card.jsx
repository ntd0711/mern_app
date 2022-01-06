import { Chip, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { IoTriangleOutline, IoTriangleSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toUpperCaseFirstLetter } from 'utils/common';
import { TiEdit } from 'react-icons/ti';

dayjs.extend(localizedFormat);

function PostCard({ post, onLike }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { profile, token } = useSelector((state) => state.user);
    const hasSignIn = !!(profile && token);

    const { title, description, createdAt, creator, _id, likes, creatorId, tags } = post;

    const handleLikePost = () => {
        if (!hasSignIn) {
            return navigate('/signin');
        }
        if (onLike) onLike(_id);
    };

    const Like = () => {
        const likedPost = likes.findIndex((x) => x === String(profile?._id)) !== -1;
        return (
            <>
                <IconButton
                    onClick={handleLikePost}
                    size="small"
                    sx={{ fontSize: '0.8rem', color: 'common.pink', ml: 4 }}
                >
                    {likedPost ? <IoTriangleSharp /> : <IoTriangleOutline />}
                </IconButton>
                <Typography variant="body2" mt={0.2}>
                    {likes.length || ''}
                </Typography>
            </>
        );
    };

    const Edit = () => {
        const isEdit = creatorId === profile?._id && location.pathname === '/profile';
        return (
            <>
                {isEdit ? (
                    <Link to={`/posts/update/${_id}`}>
                        <IconButton
                            size="small"
                            sx={{ fontSize: '1rem', color: 'common.pink', ml: 4 }}
                        >
                            <TiEdit title="edit post" />
                        </IconButton>
                    </Link>
                ) : (
                    <></>
                )}
            </>
        );
    };

    return (
        <Stack rowGap={0.8}>
            <Link to={`/posts/${_id}`}>
                <Typography
                    component="h2"
                    sx={{
                        color: 'common.pink',

                        fontWeight: 'bold',
                        fontSize: '28px',
                        cursor: 'pointer',
                    }}
                >
                    {toUpperCaseFirstLetter(title.trim())}
                </Typography>
            </Link>
            <Box mt={-1}>
                <Stack direction="row" alignItems="center">
                    <Typography fontSize="12px">{dayjs(createdAt).format('ll')}</Typography>
                    <Box
                        sx={{ width: '0.5px', height: '14px', bgcolor: 'common.text_white', mx: 2 }}
                    />
                    <Link to={creatorId === profile?._id ? '/profile' : `/profile/${creatorId}`}>
                        <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
                            {toUpperCaseFirstLetter(creator)}
                        </Typography>
                    </Link>
                    <Like />
                    <Edit />
                </Stack>
            </Box>
            <Box ml={-1}>
                {tags.map((tag) => (
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
