import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from 'hooks/use-auth';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostComments from '../components/post-comments';
import PostDetail from '../components/post-detail';
import SkeletonPostDetail from '../components/skeleton-post-detail';
import { commentPost, fetchPostById } from '../posts-thunk';
import GoToTopBtn from '../../../components/go-to-top-btn';
import StickyBar from '../components/sticky-bar';
import { savePost, votePost } from 'features/Auth/user-thunk';
import { notify } from 'utils/toastify';
import { generateKeyPost } from 'constants/key-constants';

function DetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const { id } = useParams();
  const { postDetailList, loading, loadingAction } = useSelector((state) => state.posts);
  const { profile } = useSelector((state) => state.user);
  const [loadingCmt, setLoadingCmt] = useState(false);
  const commentRef = useRef(null);
  const [pageError, setPageError] = useState();

  const postDetail = postDetailList[generateKeyPost.detail(id)];

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(fetchPostById(id));
        response.error ? setPageError(response.payload?.message) : setPageError();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, id]);

  const handleCommentPost = async (data) => {
    if (!isAuth) navigate('/signin');
    if (loadingCmt || loadingAction) return;

    try {
      setLoadingCmt(true);

      const value = data.comment.trim();
      const userId = profile._id;
      const postId = postDetail?._id;

      if (!userId || value.length <= 0 || !postId) return;
      await dispatch(commentPost({ userId, postId, text: value }));
    } catch (error) {
      setLoadingCmt(false);
      console.log(error);
    } finally {
      setLoadingCmt(false);
    }
  };

  const handleLikePost = async (data) => {
    if (loadingAction) return;
    if (!isAuth) return navigate('/signin');
    try {
      await dispatch(votePost(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikePost = async (data) => {
    if (!isAuth) return navigate('/signin');
    if (loadingAction) return;
    try {
      await dispatch(votePost(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePost = async (data) => {
    if (!isAuth) return navigate('/signin');
    if (loadingAction) return;
    try {
      const response = await dispatch(savePost(data)).unwrap();

      response.savedByUser ? notify.success('Saved post 😍') : notify.success('Unsave post 😡');
    } catch (error) {
      notify.error('save post failed');
      console.log(error);
    }
  };

  const handleScrollToComment = () => {
    window.scrollTo({
      top: commentRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
  };

  return (
    <Box mt={6}>
      {!loading && postDetail && (
        <StickyBar
          scrollToComment={handleScrollToComment}
          post={postDetail}
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
            {loading && <SkeletonPostDetail />}
            {!loading && postDetail && (
              <Stack spacing={4}>
                <PostDetail
                  post={postDetail}
                  authorId={postDetail?.author?._id}
                  profile={profile}
                />
                <PostComments
                  commentRef={commentRef}
                  loadingCmt={loadingCmt}
                  comments={postDetail?.comments}
                  onSubmit={handleCommentPost}
                  authorId={postDetail?.author?._id}
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
