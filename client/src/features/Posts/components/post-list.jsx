import { Stack } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../posts-thunk';
import PostCard from './post-card';

function PostList({ posts }) {
  const dispatch = useDispatch();
  const { loadingAction } = useSelector((state) => state.posts);

  const handleLikePost = async (id) => {
    if (loadingAction) return;
    try {
      await dispatch(likePost(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id) => {
    if (loadingAction) return;
    try {
      await dispatch(deletePost(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack rowGap={8}>
      {posts?.map((post) => (
        <PostCard onLike={handleLikePost} onDelete={handleDeletePost} key={post._id} post={post} />
      ))}
    </Stack>
  );
}

export default PostList;
