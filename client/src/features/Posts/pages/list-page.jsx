import { Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { generateKeyPost } from 'constants/key-constants';
import queryString from 'query-string';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import GoToTopBtn from '../components/go-to-top-btn';
import PostFilters from '../components/post-filter';
import PostList from '../components/post-list';
import SkeletonPostList from '../components/skeleton-post-list';
import { fetchPosts, fetchTagsPost } from '../posts-thunk';

function ListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { posts, postTags, loading } = useSelector((state) => state.posts);

  const queryParams = useMemo(() => {
    return queryString.parse(location.search) || {};
  }, [location.search]);
  const postsCategory = generateKeyPost.list(queryParams);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchPosts(queryParams));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, queryParams]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchTagsPost());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleTagChange = (newFilter) => {
    let searchParams;
    if (newFilter?.tag === queryParams?.tag) {
      const { tag, ...newQueryParams } = queryParams;
      searchParams = newQueryParams;
    } else {
      searchParams = { ...queryParams, ...newFilter };
    }

    navigate(`?${queryString.stringify(searchParams)}`);
  };

  const handleSearchChange = (newFilter) => {
    let searchParams;
    if (!newFilter?.search) {
      const { search, ...newQueryParams } = queryParams;
      searchParams = newQueryParams;
    } else {
      searchParams = { ...queryParams, ...newFilter };
    }

    navigate(`?${queryString.stringify(searchParams)}`);
  };

  return (
    <Box>
      <Container>
        <Stack spacing={3}>
          <Box mt={0.8}>
            <PostFilters
              postTags={postTags}
              filters={queryParams}
              onTagChange={handleTagChange}
              onSearchChange={handleSearchChange}
            />
          </Box>
          {loading ? <SkeletonPostList quantity={10} /> : <PostList posts={posts[postsCategory]} />}
        </Stack>
      </Container>
      <GoToTopBtn />
    </Box>
  );
}

export default ListPage;
