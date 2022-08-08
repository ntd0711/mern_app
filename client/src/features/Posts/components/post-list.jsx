import { Stack } from '@mui/material';
import useDeletePost from 'hooks/query/use-delete-post';
import useVotePost from 'hooks/query/use-vote-post';
import PostCard from './post-card';

function PostList({ posts, queryKeys, params }) {
  const mutationVote = useVotePost(queryKeys);
  const mutationDelete = useDeletePost();

  const handleVote = async (data) => {
    mutationVote.mutate({ ...data, params });
  };

  const handleDeletePost = async (id) => {
    mutationDelete.mutate(id);
  };

  return (
    <Stack rowGap={8}>
      {posts?.map((post) => (
        <PostCard onVote={handleVote} onDelete={handleDeletePost} key={post._id} post={post} />
      ))}
    </Stack>
  );
}

export default PostList;
