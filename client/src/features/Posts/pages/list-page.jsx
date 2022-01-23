import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/post-card';
import PostFilters from '../components/post-filter';
import { fetchPosts, likePost } from '../posts-thunk';

function ListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { postList } = useSelector((state) => state.posts);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      search: params?.search,
      tag: params?.tag,
    };
  }, [location.search]);

  useEffect(() => {
    // if (postList.length > 0) return;
    (async () => {
      try {
        await dispatch(fetchPosts(queryParams));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, queryParams]);

  const handleLike = async (id) => {
    try {
      await dispatch(likePost(id));
    } catch (error) {
      console.log(error);
    }
  };

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
    <Box mt={6}>
      <Container>
        <Box mt={0.8}>
          <PostFilters
            filters={queryParams}
            onTagChange={handleTagChange}
            onSearchChange={handleSearchChange}
          />
        </Box>

        {/* {isFetchPost && <Typography>Loading</Typography>} */}

        <Stack rowGap={8} mt={3}>
          {postList?.map((post) => (
            <PostCard onLike={handleLike} key={post._id} post={post} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default ListPage;
