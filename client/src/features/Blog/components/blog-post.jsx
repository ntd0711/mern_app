import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BsTrash2Fill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

dayjs.extend(relativeTime);

function PostCard({ post, main, onLike }) {
    const { profile, token } = useSelector((state) => state.user);
    const hasSignIn = !!(profile && token);

    const handleLikePost = () => {
        if (onLike) onLike(post?._id);
    };

    return (
        <Card>
            <CardMedia sx={{ pb: `${main ? '45%' : '70%'}` }} image={post?.imageUrl} />
            <CardContent sx={{ pb: '0' }}>
                <Typography
                    component="h1"
                    sx={{ fontSize: '20px', mb: '10px', fontWeight: 'bold' }}
                >
                    {post.title}
                </Typography>
                <Typography
                    sx={{ maxHeight: '70px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack width="100%" direction="row" justifyContent="space-between">
                    <IconButton
                        disabled={!hasSignIn}
                        color={post.likes.length > 0 ? 'primary' : 'default'}
                        sx={{ fontSize: '20px' }}
                        onClick={handleLikePost}
                    >
                        <AiFillLike />
                    </IconButton>
                    <IconButton disabled={!hasSignIn} sx={{ fontSize: '20px' }}>
                        <BsTrash2Fill />
                    </IconButton>
                </Stack>
            </CardActions>
        </Card>
    );
}

export default PostCard;
