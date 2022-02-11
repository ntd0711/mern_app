import { Box, Container } from '@mui/material';
import { postsApi } from 'api/posts-api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/post-form';
import SkeletonPostDetail from '../components/skeleton-post-detail';
import { updatePost } from '../posts-thunk';

function UpdatePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile } = useSelector((state) => state.user);
  const [postNeedUpdate, setPostNeedUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response = await postsApi.getPostById(id);
        setPostNeedUpdate(response);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleOnSubmit = async (data) => {
    if (postNeedUpdate.author._id !== profile._id) return;
    await dispatch(updatePost({ id, data }));
    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 2000);
  };

  return (
    <Box height="100%">
      <Container>
        {loading && <SkeletonPostDetail />}
        {!loading && <PostForm onSubmit={handleOnSubmit} post={postNeedUpdate} />}
      </Container>
    </Box>
  );
}

export default UpdatePage;
