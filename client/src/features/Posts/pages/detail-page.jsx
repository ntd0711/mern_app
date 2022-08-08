import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from 'hooks/use-auth';
import useCommentPost from 'hooks/query/use-comment-post';
import useDetailPost from 'hooks/query/use-detail-post';
import useSavePost from 'hooks/query/use-save-post';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import GoToTopBtn from '../../../components/go-to-top-btn';
import PostComments from '../components/post-comments';
import PostDetail from '../components/post-detail';
import SkeletonPostDetail from '../components/skeleton-post-detail';
import StickyBar from '../components/sticky-bar';
import useVoteDetailPost from 'hooks/query/use-vote-detail-post';

function DetailPage() {
  const navigate = useNavigate();
  const isAuth = useAuth();
  const { id } = useParams();
  const { profile } = useSelector((state) => state.user);
  const commentRef = useRef(null);

  const { mutate: votePost } = useVoteDetailPost();
  const { mutate: savePost, isLoading: isLoadingSave } = useSavePost();
  const { mutate: commentPost, isLoading: isLoadingCmt } = useCommentPost();

  const { post, isLoading, pageError } = useDetailPost(id);

  const handleCommentPost = async (data) => {
    if (!isAuth) navigate('/signin');
    if (isLoadingCmt) return;

    const value = data.comment.trim();
    const userId = profile._id;
    const postId = post?._id;

    if (!userId || value.length <= 0 || !postId) return;
    commentPost({ userId, postId, text: value });
  };

  const handleLikePost = async (data) => {
    if (!isAuth) return navigate('/signin');
    votePost(data);
  };

  const handleDislikePost = async (data) => {
    if (!isAuth) return navigate('/signin');
    votePost(data);
  };

  const handleSavePost = async (data) => {
    if (!isAuth) return navigate('/signin');
    if (isLoadingSave) return;
    savePost(data);
  };

  const handleScrollToComment = () => {
    window.scrollTo({
      top: commentRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
  };

  return (
    <Box mt={6}>
      {!isLoading && post && (
        <StickyBar
          scrollToComment={handleScrollToComment}
          post={post}
          profile={profile}
          onLike={handleLikePost}
          onDislike={handleDislikePost}
          onSave={handleSavePost}
        />
      )}
      <Container sx={{ color: 'common.grey_white' }}>
        <>{pageError && <Typography textAlign="center">{pageError}</Typography>}</>
        {!pageError && (
          <>
            {isLoading && <SkeletonPostDetail />}
            {!isLoading && post && (
              <Stack spacing={4}>
                <PostDetail post={post} authorId={post?.author?._id} profile={profile} />
                <PostComments
                  commentRef={commentRef}
                  loadingCmt={isLoadingCmt}
                  comments={post?.comments}
                  onSubmit={handleCommentPost}
                  authorId={post?.author?._id}
                  profile={profile}
                />
              </Stack>
            )}
          </>
        )}
      </Container>
      <GoToTopBtn pageYOffset={200} />
    </Box>
  );
}

export default DetailPage;
