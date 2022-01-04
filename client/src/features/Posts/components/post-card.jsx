import { IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { IoTriangleOutline, IoTriangleSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toUpperCaseFirstLetter } from 'utils/common';

dayjs.extend(localizedFormat);

function PostCard({ post, onLike, onAccessUser }) {
    const navigate = useNavigate();
    const { profile, token } = useSelector((state) => state.user);
    const hasSignIn = !!(profile && token);

    const { title, description, createdAt, creator, _id, likes, creatorId } = post;

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

    return (
        <Box>
            <Link to={`/posts/${_id}`}>
                <Typography
                    component="h2"
                    variant="h5"
                    sx={{
                        display: 'inline-block',
                        color: 'common.pink',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        cursor: 'pointer',
                    }}
                >
                    {toUpperCaseFirstLetter(title)}
                </Typography>
            </Link>
            <Stack direction="row" alignItems="flex-start">
                <Stack direction="row" alignItems="center">
                    <Typography fontSize="11px">{dayjs(createdAt).format('ll')}</Typography>
                    <Box
                        sx={{ width: '0.5px', height: '14px', bgcolor: 'common.text_white', mx: 2 }}
                    />
                    <Link to={creatorId === profile?._id ? '/profile' : `/profile/${creatorId}`}>
                        <Typography mt={0.2} variant="subtitle2" sx={{ cursor: 'pointer' }}>
                            {toUpperCaseFirstLetter(creator)}
                        </Typography>
                    </Link>
                    <Like />
                </Stack>
            </Stack>
            <Typography mt={2}>{description}</Typography>
        </Box>
    );
}

export default PostCard;
