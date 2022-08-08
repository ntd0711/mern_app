import { Box, Container } from '@mui/material';
import { postsApi } from 'api/posts-api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/post-form';

function CreatePage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (data) => {
    setIsLoading(true);
    try {
      await postsApi.createPost(data);
      setTimeout(() => {
        navigate('/posts');
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box height="100%">
      <Container>
        <PostForm onSubmit={handleOnSubmit} loading={isLoading} />
      </Container>
    </Box>
  );
}

export default CreatePage;
