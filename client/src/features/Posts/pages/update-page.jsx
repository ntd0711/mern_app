import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/post-form';
import SkeletonPostDetail from '../components/skeleton-post-detail';
import { fetchPostById, updatePost } from '../posts-thunk';

function UpdatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { profile } = useSelector((state) => state.user);
  const { postDetail, loading } = useSelector((state) => state.posts);
  const [loadingFetch, setLoadingFetch] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoadingFetch(true);

        await dispatch(fetchPostById(id)).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFetch(false);
      }
    })();
  }, [id, dispatch]);

  const handleOnSubmit = async (data) => {
    if (loading) return;
    if (postDetail.author._id !== profile._id) return;
    await dispatch(updatePost({ id, data })).unwrap();
    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 2000);
  };

  return (
    <Box height="100%">
      <Container>
        {loadingFetch && <SkeletonPostDetail />}
        {!loadingFetch && (
          <PostForm onSubmit={handleOnSubmit} post={postDetail} loading={loading} />
        )}
      </Container>
    </Box>
  );
}

export default UpdatePage;
