import { createSlice } from '@reduxjs/toolkit';
import { generateKeyPost } from 'constants/key-constants';
import {
  getPostsCreatedByUser,
  getPostsSavedByUser,
  savePost,
  votePost,
} from 'features/Auth/user-thunk';
import { notify } from 'utils/toastify';
import {
  commentPost,
  createPost,
  deletePost,
  fetchPostById,
  fetchPosts,
  fetchTagsPost,
  updatePost,
} from './posts-thunk';

const initialState = {
  posts: {},
  postDetailList: {},
  postTags: [],
  loading: false,
  loadingAction: false,
};

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        const category = generateKeyPost.list(action.meta.arg);
        state.posts[category] ? (state.loading = false) : (state.loading = true);
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const category = generateKeyPost.list(action.meta.arg);
        state.posts[category] = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(fetchPostById.pending, (state, action) => {
        const category = generateKeyPost.detail(action.meta.arg);
        state.postDetailList[category] ? (state.loading = false) : (state.loading = true);
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        const category = generateKeyPost.detail(action.meta.arg);
        state.postDetailList[category] = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(fetchTagsPost.pending, (state, action) => {
        // state.loading = true;
      })
      .addCase(fetchTagsPost.fulfilled, (state, action) => {
        state.postTags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTagsPost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(createPost.pending, (state, action) => {
        state.loadingAction = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        const { authorId, newPost, allTagsPost } = action.payload;
        const category = generateKeyPost.createdByUser(authorId);

        if (!state.posts[category]) state.posts[category] = [];

        state.posts[category].push(newPost);
        state.postTags = allTagsPost;
        notify.success('Create post successfully!');

        state.loadingAction = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loadingAction = false;
      })

      .addCase(deletePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { authorId, postId } = action.payload;
        const category = generateKeyPost.createdByUser(authorId);

        state.posts[category] = state.posts[category].filter((post) => post._id !== postId);

        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(votePost.pending, (state, action) => {
        state.loadingAction = true;
      })
      .addCase(votePost.fulfilled, (state, action) => {
        const { postId } = action.meta.arg;
        const point = action.payload?.point;
        const statusVote = action.payload?.statusVote;
        const { posts, postDetailList } = state;

        for (const key in posts) {
          const post = posts[key].find((post) => post._id === postId);
          if (!post) continue;
          post.point = point;
          post.statusVote = statusVote;
        }

        for (const key in postDetailList) {
          if (generateKeyPost.detail(postId) === key) {
            const post = postDetailList[key];
            if (!post) continue;
            post.point = point;
            post.statusVote = statusVote;
          }
        }

        state.loadingAction = false;
      })
      .addCase(votePost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loadingAction = false;
      })

      .addCase(updatePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        notify.success('Update post successfully!');
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        if (action.error) notify.error(action.payload.message);
        state.loading = false;
      })

      .addCase(commentPost.pending, (state, action) => {})
      .addCase(commentPost.fulfilled, (state, action) => {
        const { postId } = action.meta.arg;
        const category = generateKeyPost.detail(postId);

        state.postDetailList[category].comments = action.payload;
      })
      .addCase(commentPost.rejected, (state, action) => {})

      .addCase(savePost.pending, (state, action) => {})
      .addCase(savePost.fulfilled, (state, action) => {
        const { postId } = action.meta.arg;
        const { savedByUser, usersSaved } = action.payload;

        const category = generateKeyPost.detail(postId);
        state.postDetailList[category].savedByUser = savedByUser;
        state.postDetailList[category].usersSaved = usersSaved;
      })
      .addCase(savePost.rejected, (state, action) => {})

      .addCase(getPostsCreatedByUser.pending, (state, action) => {
        const category = generateKeyPost.createdByUser(action.meta.arg);
        state.posts[category] ? (state.loading = false) : (state.loading = true);
      })
      .addCase(getPostsCreatedByUser.fulfilled, (state, action) => {
        const userId = action.meta.arg;
        const { createdPosts } = action.payload;

        const category = generateKeyPost.createdByUser(userId);
        state.posts[category] = createdPosts;

        state.loading = false;
      })
      .addCase(getPostsCreatedByUser.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getPostsSavedByUser.pending, (state, action) => {})
      .addCase(getPostsSavedByUser.fulfilled, (state, action) => {
        const { userId, savedPosts } = action.payload;
        const category = generateKeyPost.savedByUser(userId);

        state.posts[category] = savedPosts;
        state.loading = false;
      })
      .addCase(getPostsSavedByUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

const { reducer } = postsSlice;

export default reducer;
