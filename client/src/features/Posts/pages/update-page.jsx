import { Box, Container } from '@mui/material';
import { postsApi } from 'api/posts-api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/post-form';
import { updatePost } from '../posts-thunk';

function UpdatePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile } = useSelector((state) => state.user);
  const [postNeedUpdate, setPostNeedUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await postsApi.getPostById(id);
      setPostNeedUpdate(response);
    })();
  }, [id]);

  const handleOnSubmit = async (data) => {
    if (postNeedUpdate.author._id !== profile._id) return;
    await dispatch(updatePost({ id, data }));
    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 2500);
  };

  if (Object.keys(postNeedUpdate).length === 0) return 'loading...';
  return (
    <Box height="100%">
      <Container maxWidth="lg">
        <PostForm onSubmit={handleOnSubmit} post={postNeedUpdate} />
      </Container>
    </Box>
  );
}

export default UpdatePage;
