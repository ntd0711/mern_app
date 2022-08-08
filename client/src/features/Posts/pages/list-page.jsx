import { Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import usePostTags from 'hooks/query/use-post-tags';
import usePosts from 'hooks/query/use-posts';
import queryString from 'query-string';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GoToTopBtn from '../../../components/go-to-top-btn';
import PostFilters from '../components/post-filter';
import PostList from '../components/post-list';
import SkeletonPostList from '../components/skeleton-post-list';

function ListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    return queryString.parse(location.search) || {};
  }, [location.search]);
  const { posts, isErrorPosts, isLoadingPosts } = usePosts(queryParams);
  const { postTags, isErrorTags, isLoadingTags } = usePostTags();

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
              isLoadingTags={isLoadingTags}
            />
          </Box>
          {isLoadingPosts ? (
            <SkeletonPostList quantity={10} />
          ) : (
            <PostList posts={posts} queryKeys="posts" params={queryParams} />
          )}
        </Stack>
      </Container>
      <GoToTopBtn pageYOffset={400} />
    </Box>
  );
}

export default ListPage;
