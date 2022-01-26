import { Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import queryString from 'query-string';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PostFilters from '../components/post-filter';
import PostList from '../components/post-list';
import SkeletonPosts from '../components/skeleton';
import { fetchPosts } from '../posts-thunk';

function ListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { postList, loading } = useSelector((state) => state.posts);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      search: params?.search,
      tag: params?.tag,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchPosts(queryParams));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, queryParams]);

  const handleTagChange = (newFilter) => {
    if (queryParams.tag === newFilter.tag) return navigate('/posts');

    const searchParams = queryString.stringify({ ...newFilter });
    navigate(`?${searchParams}`);
  };

  const handleSearchChange = (newFilter) => {
    const searchParams = queryString.stringify({ ...newFilter });
    navigate(`?${searchParams}`);
  };

  return (
    <Box>
      <Container>
        <Stack spacing={3}>
          <Box mt={0.8}>
            <PostFilters
              filters={queryParams}
              onTagChange={handleTagChange}
              onSearchChange={handleSearchChange}
            />
          </Box>
          <Box>{loading ? <SkeletonPosts quantity={10} /> : <PostList posts={postList} />}</Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default ListPage;
