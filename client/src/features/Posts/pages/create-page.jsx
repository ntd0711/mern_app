import { Box, Container } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/post-form';
import { createPost } from '../posts-thunk';

function CreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingAction } = useSelector((state) => state.posts);

  const handleOnSubmit = async (data) => {
    if (loadingAction) return;
    try {
      await dispatch(createPost(data));
      setTimeout(() => {
        navigate('/posts');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box height="100%">
      <Container>
        <PostForm onSubmit={handleOnSubmit} loading={loadingAction} />
      </Container>
    </Box>
  );
}

export default CreatePage;
