import { Box, Container } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/post-form';
import { createPost } from '../posts-thunk';

function CreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = async (data) => {
    await dispatch(createPost(data));
    setTimeout(() => {
      navigate('/posts');
    }, 2000);
  };

  return (
    <Box height="100%">
      <Container>
        <PostForm onSubmit={handleOnSubmit} />
      </Container>
    </Box>
  );
}

export default CreatePage;
