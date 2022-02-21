import { Stack } from '@mui/material';
import { votePost } from 'features/Auth/user-thunk';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../posts-thunk';
import PostCard from './post-card';

function PostList({ posts }) {
  const dispatch = useDispatch();
  const { loadingAction } = useSelector((state) => state.posts);

  const handleVote = async (data) => {
    if (loadingAction) return;
    try {
      await dispatch(votePost(data));
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
        <PostCard onVote={handleVote} onDelete={handleDeletePost} key={post._id} post={post} />
      ))}
    </Stack>
  );
}

export default PostList;
