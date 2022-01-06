import { createSlice } from '@reduxjs/toolkit';
import { notify } from 'utils/toastify';
import { createPost, fetchPosts, fetchTagsPost, likePost } from './posts-thunk';

const initialState = {
    postList: [],
    postDetail: {},
    postTags: [],
};

export const postsSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.postList = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            notify.error(action.payload.message);
        });

        builder.addCase(fetchTagsPost.fulfilled, (state, action) => {
            state.postTags = action.payload;
        });
        builder.addCase(fetchTagsPost.rejected, (state, action) => {
            notify.error(action.payload.message);
        });

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.postList.push(action.payload.newPost);
            state.postTags = action.payload.allTagsPost;
            notify.success('Create post successfully!');
        });
        builder.addCase(createPost.rejected, (state, action) => {
            notify.error(action.payload.message);
        });

        builder.addCase(likePost.fulfilled, (state, action) => {
            const { _id } = action.payload;
            const index = state.postList.findIndex((post) => post._id === _id);
            state.postList.splice(index, 1, action.payload);
        });
        builder.addCase(likePost.rejected, (state, action) => {
            notify.error(action.payload.message);
        });
    },
});

const { reducer } = postsSlice;

export default reducer;
